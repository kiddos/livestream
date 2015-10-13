var io = io('127.0.0.1:3001');
var buffer = [];
//var display = document.getElementById('display');
var image = new Image();
var load = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var container = $(canvas).parent();

// startup canas size
$(document).ready(function() {
  var width = $(container).width() * 0.66;
  var height = width / 8 * 6;
  $(canvas).attr('width', width);
  $(canvas).attr('height', height);
});

io.on('data', function(data) {
  image.src = 'data:image/jpeg;base64,' + data.image;
  //image.src = "temp/image" + data.index + ".jpg" + '?t=' + new Date().getTime();
});

image.onload = function() {
  var width = canvas.width;
  var height = canvas.height;
  context.drawImage(image, 0, 0, width, height);
};

// resize event
$(window).resize(function() {
  var width = $(container).width() * 0.66;
  var height = width / 8 * 6;
  $(canvas).attr('width', width);
  $(canvas).attr('height', height);
});
