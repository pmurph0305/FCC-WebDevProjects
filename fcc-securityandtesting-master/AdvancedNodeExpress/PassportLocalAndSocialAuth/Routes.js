const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function(app, db) {
  
  app.route('/')
    .get((req, res) => {
      //res.sendFile(process.cwd() + '/views/index.html');
      //res.render(__dirname + '/views/pug/index.pug');
      res.render(process.cwd() + '/views/pug/index', { 
        title: 'Home Page', 
        message: 'Please login', 
        showLogin: true,
        showRegistration: true
      });
    });

  app.post('/register', function(req, res, next) {
    db.collection('users').findOne({ username: req.body.username }, function(err, user) {
      // database error
      if (err) { 
        console.log('DB register findone error:' + err);
        next(err); 
      }
      // user already exists
      if (user) { res.redirect('/'); }
      // is a new user
      else {
        // generate a password hash to store
        let hash = bcrypt.hashSync(req.body.password, 12);
        db.collection('users').insertOne({
          username: req.body.username,
          password: hash
        }, function(err, user) {
          // db error
          if (err) { 
            console.log('DB register insert error:'+ err);
            res.redirect('/') }
          // registration worked
          else { next(null, user) }
        });
      }
    })},
    // authenticate user
    passport.authenticate('local', { failureRedirect: '/' }),
    // redirect to profile
    function(req, res, next) {
      res.redirect('/profile');
    }
  )

  // logout using passport is done using req.logout()
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // login with passport authneticate
  app.post('/login', passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
      res.redirect('/profile');
  });

  // profile, make sure user is authenticated
  app.get('/profile', ensureAuthenticated, function(req, res) {
    res.render(process.cwd() + '/views/pug/profile', { username: req.user.username });
  })

  // handle missing pages
  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  })

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } 
    res.redirect('/')
  }
  
  // listen
  app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port " + process.env.PORT);
  });
}