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

  $('#sumbit').click(app.handleSubmit.bind(app));

});

var app = {

  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',

  init: function() {

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
        // send data to renderMessage or run renderMessage
        console.log(data);
      },
      error: function (data) {
        console.log('error');
      }
    });

  },

  clearMessages: function() {
    // should be able to clear messages from the DOM
    // $.('.message').remove();

  },

  renderMessage: function() {
    // should be able to add messages to the DOM

  },

  renderRoom: function() {
    // should be able to add rooms to the DOM

  },

  handleUsernameClick: function() {
    // should add a friend

  },

  handleSubmit: function() {
    // should try to send a message upon clicking submit

    var dirtyData = $('#input').text();
    var cleanData = sanitizeHTML(dirtyData);
    app.send(cleanData).bind(app);

  }

};