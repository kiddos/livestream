var imageio = io('127.0.0.1:3001');
var chatio = io('127.0.0.1:3002');
//var io = io('10.0.15.58:3001');
var buffer = [];
//var display = document.getElementById('display');
var image = new Image();
var load = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var container = $(canvas).parent();
var chatWindow = document.getElementById('chatwindow');

// startup canas size
$(document).ready(function() {
  var width = $(container).width() * 0.66;
  var height = width / 8 * 6;
  $(canvas).attr('width', width);
  $(canvas).attr('height', height);
  $(chatWindow).css('height', height);
});

// receiving image data
imageio.on('data', function(data) {
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
  $(chatWindow).css('height', height);
});


// sending data
var chatDisplay = document.getElementById('chatdisplay');
var inputarea = document.getElementById('inputarea');
var chatName = document.getElementById('chatname');
inputarea.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 13:
      var name = $(chatName).val();
      if (name === '') {
        name = "No name";
      }
      var text = $(inputarea).val();
      if (text !== '') {
        chatio.emit('clientsay', {text: $(inputarea).val(), name: name});
        inputarea.value = "";
      }
      break;
  }
});

chatio.on('chatdata', function(data) {
  console.log('refresh chat data');
  var chatData = data.chat;
  chatDisplay.value = "";
  for (var i = 0; i < chatData.length ; i++) {
    chatDisplay.value += chatData[i].name + ": " + chatData[i].text;
    //$(chatDisplay).scrollTop($(chatDisplay).scrollHeight);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }
});
