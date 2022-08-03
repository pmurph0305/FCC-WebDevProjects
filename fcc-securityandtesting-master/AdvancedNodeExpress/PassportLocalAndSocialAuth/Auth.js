const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');


module.exports = function(app, db) {
  // serialize user
  passport.serializeUser((user, done) => {
    console.log('serialize')
    done(null, user._id);
  });

  // derserialize user
  passport.deserializeUser((id, done) => {
    console.log('deserialize')
    db.collection('users').findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
  
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done) {
    db.collection('users').findOne({ username: username }, function(err, user) {
      console.log("User:" + username + " is trying to log in.");
      if (err) { 
        console.log('error..' + err)
        return done(err); }
      if (!user) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
      return done(null, user)
    });
  }))
}