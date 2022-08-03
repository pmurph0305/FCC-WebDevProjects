const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
var shortid = require('shortid')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI);
var Schema = mongoose.Schema;

// User object with username and _id.
var UserSchema = new Schema ({
  username: { type: String, required: true },
  _id: { 'type': String, 'default': shortid.generate },
});
var UserModel = mongoose.model('UserModel', UserSchema);

// userId(_id), description, duration, and optionally date to /api/exercise/add.
// If you must modify Date types using built-in methods, tell mongoose about the change with doc.markModified('pathToYourDate') before saving.
var ExerciseSchema = new Schema({
  userId: { type: String, required: true},
  description: { type: String, required: true },
  duration:{type: Number, required: true },
  date: { type: Date , default: new Date()}
});
var ExerciseModel = mongoose.model('ExerciseModel', ExerciseSchema);

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


// 1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
app.post('/api/exercise/new-user', function(req, res){
  //console.log('got post request with:'+req.body)
  if (req.body.username) {
    let NewUser = new UserModel({ username: req.body.username });
    NewUser.save(function(err, data) {
      if (err) {
        res.json("Error adding new user.");
      } else {
        res.json(data);
      }
    });
  } else {
    res.json("Must have a username.");
  }
});

// 2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
app.get('/api/exercise/users', function(req, res) {
  UserModel.find({}, function(err, data) {
    if (err) {
      res.json("Error getting users.");
    } else {
      res.json(data);
    }
  });
});

// 3. I can add an exercise to any user by posting form data 
//userId(_id), description, duration, and optionally date to /api/exercise/add.
// If no date supplied it will use current date.
// Returned will the the user object
// with also with the exercise fields added.
app.post('/api/exercise/add', function(req, res) {
  let userId = req.body.userId;
  let description = req.body.description;
  // date checking could be improved.
  let timestamp = Date.parse(req.body.date);
  let date;
  if (isNaN(timestamp) == false) {
    date = new Date(req.body.date);
  } else {
    date = new Date();
  }
  let duration = req.body.duration;
  if (!duration || !userId || !description) {
    res.json("Must enter a userId, description, and duration.");
  } else {
    // verify a user id first.
    UserModel.findById(userId, function(errf, dataf) {
      if (errf || !dataf) {
          res.json('Invalid user id.');
      } else {
        // create a new exercise
        let NewExercise = new ExerciseModel({
          userId: userId,
          description: description,
          duration: duration,
          date: date
        });
        // and save the exercise, returning the exercise data.
        NewExercise.save(function(err, data) {
          if (err) {
            res.json("Error adding exercise.");
          } else {
            // Returned data is user object with exercise fields added.
            let combinedData = Object.assign({}, data._doc);
            Object.assign(combinedData, dataf._doc);
            res.json(combinedData);
          }
        });
      }
    });
  }
});


// 4. I can retrieve a full exercise log of any user by getting 
// api/exercise/log with a parameter of userId(_id).
// Return will be the user object with added array log and count (total exercise count).
// 5. I can retrieve part of the log of any user by also passing 
//along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

//jHwHms6XZ is an example userid with some entries in it.
app.get('/api/exercise/log', function(req, res) {
  if (req.query.userId) {
    // make sure we have a valid user first
    UserModel.findById(req.query.userId, function(errf, dataf) {
      if (errf || !dataf) {
        res.json("Invalid userId.");
      } else {
        // Check and parse the from date if we have one
        if (req.query.from) {
          let timestamp = Date.parse(req.query.from);
          if (isNaN(timestamp) == false) {
            var from = new Date(req.query.from);
          }
        }
        // Check and parse the to date if we have one.
        if (req.query.to) {
          let timestamp = Date.parse(req.query.to);
          if (isNaN(timestamp) == false) {
            var to = new Date(req.query.to);
          }
        }
        var query =  ExerciseModel.find({ 
          userId: req.query.userId, 
          // use $gt and $lt for greater than and less than for dates.
          // 0 as from will give all entries, and new Date will give up to current date, so it works if they are not supplied.
          date: {$gt : from ? from : 0, $lt : to ? to : new Date()}
        });
        // see if we have a valid limit, and set it.
        if (Number.isInteger(parseInt(req.query.limit))) {
          var limit = query.limit(parseInt(req.query.limit));  
        }
        query.exec(function(err, data) {
          if (err) {
            res.json("Error getting users exercises")
          } else {
            // Return will be the user object with added array log and count (total exercise count).
            let combinedData = Object.assign({}, dataf._doc);
            Object.assign(combinedData, { count: data.length, log: data })
            res.json(combinedData);
          }
        })
      }
    });
  }
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

