'use strict';

var express = require('express');
var cors = require('cors');
// for express-fileupload version
var fileUpload = require('express-fileupload');
// using busboy
var http = require('http'),
      inspect = require('util').inspect;
 var Busboy = require('busboy');

var app = express();
app.use(cors());

// for express-fileupload
// app.use(fileUpload({
//   limits: { fileSize: 50 * 1024 * 1024 },
// }));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', function(req, res) {
  // Using express-fileupload
  // if (req.files && req.files.upfile) {
  //   res.json({
  //     filename: req.files.upfile.name,
  //     size: req.files.upfile.size
  //   })
  // }

  let size = 0;
  let name = '';
  var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      name = filename;
      file.on('data', function(data) {
        size += data.length;
      });
    });
    busboy.on('finish', function() {
      res.json({
        filename: name,
        size: size
      })
    });
    req.pipe(busboy);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});