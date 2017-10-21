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
  $("form").submit(function(e) {
    e.preventDefault();
  });

  $('#roomSelect').on('change', function() {
    app.room = $('#roomSelect').find(":selected").text();
  });

});

var app = {

  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',
  friends: [],
  latestId: 0,
  room: 'lobby',

  init: function() {

    app.fetch();

    // fetch new messages every second
    setInterval(function(){
      app.fetch();
    }, 3000);

  },

  send: function(postData) {
    // submit a POST request via ajax
    // should send correct method along with request

    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(postData),
      contentType: 'application/json',
      success: function (data) {
        $('#message').val('');
        $('#message').attr('placeholder', 'message sent!');
        app.fetch();
      }
    });

  },


  fetch: function() {
    // should submit a GET request via ajax
    $.ajax({
      url: app.server,
      type: 'GET',
      data: { order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        // get the most recent message
        var mostRecent = data.results[data.results.length-1];

        // if the most recent message id !== the message at the top of chat
        if (mostRecent !== undefined && mostRecent.objectId !== app.latestId) {
          // render message
          app.renderMessage(data);
          app.latestId = mostRecent.objectId;
        }
      },
      error: function (data) {
        console.log('error');
      }
    });

  },


  // filter: function(data) {
  //   var testXss = [];

  //   var clean = data.results(function(item) {
  //   if (item.username.includes())
  //   });
  // },

  clearMessages: function() {
    // should be able to clear messages from the DOM
    $('#chats').text('');

  },

  renderMessage: function(data) {
    // should be able to add messages to the DOM
    app.clearMessages();

    // if the data was received from the user
    if (data.results === undefined) {
      var post = '<span class="username">' + data.username + ':</span> ' + data.text;
      $('#chats').append('<li class="message ' + data.room + '">' + post + '</li>');

    // else, if the data was received from the server
    } else {
      for (var i = 0; i < data.results.length; i++) {
        var msg = data.results[i];
        var post = '<span class="username">' + msg.username + ':</span> ' + msg.text;

        $('#chats').append('<li class="message ' + data.room + '">' + post + '</li>');
      }
    }
  },

  renderRoom: function(room) {
    // should be able to add rooms to the DOM
    $('#roomSelect').prepend('<option value="' + room + '">' + room + '"</option>');

  },

  handleUsernameClick: function() {
    app.friends.push($('.username').val);
    console.log('friend added');

  },

  handleSubmit: function() {
    var data = {};
    var text = $('#message').val();
    var username = window.location.search.slice(10);

    // get username
    data.username = username;
    // get message
    data.text = text;
    // get room
    data.room = app.room;

    // send data object to api
    app.send(data);
  },

  cleanData: function(data) {

    for (var i = 0; i < data.results.length; i++) {
      data.results[i].username = encodeURI(data.results[i].username);
      data.results[i].text = encodeURI(data.results[i].text);
    }

    return data;
  }

  /*
  escape: function(message) {
    return message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/''/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&grave;').replace(/,/g, '&comma;').replace(/!/g, '&excl;').replace(/@/g, '&commat;').replace(/$/g, '&dollar;').replace(/%/g, '&percent;').replace(/\(/g, '&lpar;').replace( /\)/g, '&rpar;').replace(/=/g, '&equals;').replace(/\+/g, '&plus;').replace(/{/g, '&lcub;').replace(/}/g, '&rcub;').replace(/\[/g, '&lsqb;').replace(/]/g, '&rsqb;');
  }
  */

};

/*
    return message.replace(/</g, '').replace(/>/g, '').replace(/'/g, '').replace(/`/g, '')replace(/$/g, '').replace(/%/g, '').replace(/\(/g, '').replace( /\)/g, '').replace(/=/g, '').replace(/\+/g, '').replace(/{/g, '').replace(/\[/g, '').replace(/]/g, '');
*/
