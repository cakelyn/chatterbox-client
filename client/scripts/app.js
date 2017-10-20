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

var app = {

  init: function() {

  },

  send: function(postData) {
    // submit a POST request via ajax
    // should send correct method along with request

    $.ajax({
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
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
    $.get({
      url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',
      success: function (data) {
        // send data to renderMessage or run renderMessage
      }
    });

  },

  clearMessages: function() {
    // should be able to clear messages from the DOM

  },

  // sanitizeHTML: function(dirtyData) {
  //   // var sanitizeHtml = require('sanitize-html');
  //   // run any input through sanitize-html
  //   // if it returns all fine, send postData to send method

  //   // retun cleanPostData
  // },

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

  }

};