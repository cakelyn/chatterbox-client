// YOUR CODE HER$.
/*
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});

*/

$(document).ready(function(){

  app.init();

  $('#submit').click(app.handleSubmit());

});

var app = {

  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',

  init: function() {

    // on username click, trigger handleUsernameClick
    $('.username').click(app.handleUsernameClick());

  },

  send: function(postData) {
    // submit a POST request via ajax
    // should send correct method along with request

    $.ajax({
      url: app.server,
      type: 'POST',
      data: postData,
      contentType: 'application/json',
      success: function (data) {
        // send data to renderMessage or run renderMessage
      }
    });

  },


  fetch: function() {
    // should submit a GET request via ajax
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.renderMessage(data);
      },
      error: function (data) {
        console.log('error');
      }
    });

  },

  clearMessages: function() {
    // should be able to clear messages from the DOM
    $('#chats').text('');

  },

  renderMessage: function(message) {
    // should be able to add messages to the DOM
    $('#chats').append('<div class="message">' + '<span class="username>' + message.username + '</span>' + ': ' + message.text + '</div>');

  },

  renderRoom: function(room) {
    // should be able to add rooms to the DOM
    $('#roomSelect').prepend('<option value="' + room + '">' + room + '"</option>');

  },

  handleUsernameClick: function() {
    // should add a friend
    $('.username').click(function() {
      console.log('added friend');
    });

  },

  handleSubmit: function() {
    // should try to send a message upon clicking submit
    var dirty = document.getElementById('input').value;
    console.log(dirty);
    // var clean = app.escape(dirty);
    // console.log(clean);

    app.send(dirty);

  },

  escape: function(message) {
    return message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/''/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&grave;').replace(/,/g, '&comma;').replace(/!/g, '&excl;').replace(/@/g, '&commat;').replace(/$/g, '&dollar;').replace(/%/g, '&percent;').replace(/\(/g, '&lpar;').replace( /\)/g, '&rpar;').replace(/=/g, '&equals;').replace(/\+/g, '&plus;').replace(/{/g, '&lcub;').replace(/}/g, '&rcub;').replace(/[/g, '&lsqb;').replace(/]/g, '&rsqb;');
 }

};




