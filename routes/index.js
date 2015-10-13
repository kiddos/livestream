var express = require('express');
var router = express.Router();
var fs = require('fs');
var io = require('socket.io')();

var imageport = 3001;
var updateInterval = 66;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Live Streaming'});
});

io.on('connection', function() {
  console.log('client connected');
});
io.listen(imageport);


var count = 0;
var filePath = "./public/temp/image" + count + ".jpg";

var removeCallback = function(err) {
  console.log("remove " + filePath);
};

var readCallback = function(err, buffer) {
  if (buffer !== undefined) {
  console.log("sending " + filePath);
    io.emit('data', {image: buffer.toString('base64'), index: count});
  }
};

var sendData = function() {
  for (var i = 0 ; i < 1000 ; i ++) {
    if (fs.existsSync(filePath)) {
      var nextFilePath = "./public/temp/image" + (count + 1) + ".jpg";
      if (fs.existsSync(nextFilePath)) {
        fs.unlink(filePath, removeCallback);
        count ++;
        filePath = "./public/temp/image" + count + ".jpg";
      } else {
        // send the data
        fs.readFile(filePath, readCallback);
        break;
      }
    }
  }
};
setInterval(sendData, updateInterval);


module.exports = router;
