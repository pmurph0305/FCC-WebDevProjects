const session     = require('express-session');
const mongo       = require('mongodb').MongoClient;
const passport    = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

module.exports = function (app, db) {
  
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.collection('chatusers').findOne(
            {id: id},
            (err, doc) => {
                done(null, doc);
            }
        );
    });

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://serious-makeup-1.glitch.me/auth/github/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
          db.collection('chatusers').findAndModify(
              {id: profile.id},
              {},
              {$setOnInsert:{
                  id: profile.id,
                  name: profile.displayName || 'No Name',
                  photo: profile.photos[0].value || '',
                  email: profile.email || 'No email',
                  created_on: new Date(),
                  provider: profile.provider || 'No Provider'
              },$set:{
                  last_login: new Date()
              },$inc:{
                  login_count: 1
              }},
              {upsert:true, new: true}, //Insert object if not found, Return new object after modify
              (err, doc) => {
                  if (err) { console.log("ERROR:" + err)}
                  return cb(null, doc.value);
              }
          );
        }
    ));
}