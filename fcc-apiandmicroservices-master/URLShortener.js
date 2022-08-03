'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var dns = require('dns');
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI);
var Schema = mongoose.Schema;
var URLSchema = new Schema({
  original_url: {type: String, required: true, default: "https://www.google.com"},
  short_url: {type: Number, required: true, default: 0}
})
var URL = mongoose.model('URL', URLSchema);


app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new", function(req, res) {
  console.log(req.body)
  let url = req.body.url;
  // check if url is valid from #2...
  var regex = /https?:\/\//
  if (!url.match(regex)) {
      res.json({error: "invalid URL"})
  } else {
    // otherwise, will not resolve with these regex if not following the format of #2.
    // remove http(s)://www. and everything after .com for hostname
    var comregex = /\/\w+/g
    var hostname = url.replace(regex, "").replace(comregex, "").replace(comregex, "");
    dns.lookup(hostname, function(err, address, family) {
      if (err) {
        res.json({error: "invalid URL"})
      } else {
        // get last entry
        URL.findOne({}, {}, {sort: {short_url: -1} }, function(errlast, last) {
          // create new entry based on last if it exists
          var u = new URL({
            original_url: url,
            short_url: last ? last.short_url+1 : 0
          })
          // save new entry
          u.save(function(err, data) {
            if (err) {
              res.json({error: "database Error"});
            } else {
              res.json({original_url: url, "short_url": u.short_url})
            }
          })
        })
      }
    })
  }
})

app.get('/api/shorturl/:short_url', function(req, res) {
  // make sure we have the param
  if (!req.params.short_url) {
    res.json({error: "invalid URL"})
  } else { 
    // find the full url entry
    URL.findOne({short_url: req.params.short_url}, {original_url:1}, function(err, data) {
      if (err) {
        // database problem..
        res.json({error: "database Error"})
      } else {
        //redirect to the original url
        res.redirect(data.original_url)
      }
    })
  }
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});