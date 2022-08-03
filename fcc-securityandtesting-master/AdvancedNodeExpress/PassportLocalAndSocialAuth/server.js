'use strict';
// Requires
const auth = require('./Auth.js');
const bodyParser  = require('body-parser');
const express     = require('express');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const GitHubStrategy = require('passport-github').Strategy;

//const mongodb = require('mongodb')
const mongo = require('mongodb').MongoClient;
const routes = require('./Routes.js');
const passport = require('passport');
const session = require('express-session');


const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set the view engine to pug
app.set('view engine', 'pug');


// LOCAL SESSIONS
// set up the express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));



// setup passport session
app.use(passport.initialize());
app.use(passport.session());


// Enable to pass the challenge called "Advanced Node and Express - 
// Registration of New Users"
if (process.env.ENABLE_DELAYS) app.use((req, res, next) => {
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/logout': return setTimeout(() => next(), 500);
        case '/profile': return setTimeout(() => next(), 700);
        default: next();
      }
    break;
    case 'POST':
      switch (req.url) {
        case '/login': return setTimeout(() => next(), 900);
        default: next();
      }
    break;
    default: next();
  }
});

// conected to database.
mongo.connect(process.env.DATABASE, (err, client) => {
  let db = client.db('userauth')
  if (err) {
    console.log("DB Error:" + err);
  } else {
    console.log("Connected to DB")
    
    // BEGIN SOCIAL AUTH CHALLENGES (COMMENT OUT FOR LOCAL STRATEGY)
    
    // Routes & new GitHubStrategy here instead of in routes and auth files to pass FCC testing.
    passport.serializeUser((user, done) => {
          done(null, user.id);
        });

    passport.deserializeUser((id, done) => {
        db.collection('socialusers').findOne(
            {id: id},
            (err, doc) => {
                done(null, doc);
            }
        );
    });

    app.route('/auth/github').get(passport.authenticate('github'));
    
    app.route('/auth/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/' }), (req,res) => {
        res.redirect('/profile');
    });

    app.route('/profile')
    .get(ensureAuthenticated, (req, res) => {
         res.render(process.cwd() + '/views/pug/profile', {user: req.user});
    });

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      res.redirect('/');
    };

    //Github Strategy
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://grey-bell.glitch.me/auth/github/callback'
    }, function(accessToken, refreshToken, profile, cb) {
     // console.log(profile);
      db.collection('socialusers').findAndModify({id: profile.id}, {},
        {$setOnInsert:{
          id: profile.id,
          name: profile.displayName || 'No Name',
          photo: profile.photos[0].value || '',
          email: profile.email || 'No email',
          created_on: new Date(),
          provider: profile.provider || 'No Provider'
        }, $set:{ last_login: new Date() 
        }, $inc:{ login_count: 1 
        }},
        {upsert: true, new: true},
          (err, doc) => { 
          return cb(null, doc.value)
        });
     }));
    // END SOCIAL AUTH CHALLENGES (COMMENT OUT FOR LOCAL STRATEGY)

    // NON-SOCIAL CHALLENGES:
    // setup all the auth
    auth(app, db);
    // handle all the routes
    routes(app, db);
    
  }
})



