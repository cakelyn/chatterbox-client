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
  // $('#submit').click(app.handleSubmit());
  $('.username').click(app.handleUsernameClick());

});

var app = {

  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',

  init: function() {

    app.fetch();

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
        app.renderMessage(data);
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
        console.log(data);
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

  renderMessage: function(data) {
    // should be able to add messages to the DOM

    // if the data was received from the user
    if (data.results === undefined) {
      console.log(data);
      var post = data.username + ': ' + data.text;
      $('#chats').prepend('<div class="message">' + post + '</div>');

    // else, if the data was received from the server
    } else {
      for (var i = 0; i < data.results.length; i++) {
        var msg = data.results[i];
        var post = msg.username + ': ' + msg.text;

        $('#chats').prepend('<div class="message">' + post + '</div>');
      }
    }
  },

  renderRoom: function(room) {
    // should be able to add rooms to the DOM
    $('#roomSelect').prepend('<option value="' + room + '">' + room + '"</option>');

  },

  handleUsernameClick: function() {
    var msg = $('#message').val();
    console.log(msg);

  },

  handleSubmit: function(data) {

    console.log(data);
  },

  escape: function(message) {
    return message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/''/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&grave;').replace(/,/g, '&comma;').replace(/!/g, '&excl;').replace(/@/g, '&commat;').replace(/$/g, '&dollar;').replace(/%/g, '&percent;').replace(/\(/g, '&lpar;').replace( /\)/g, '&rpar;').replace(/=/g, '&equals;').replace(/\+/g, '&plus;').replace(/{/g, '&lcub;').replace(/}/g, '&rcub;').replace(/\[/g, '&lsqb;').replace(/]/g, '&rsqb;');
  }

};