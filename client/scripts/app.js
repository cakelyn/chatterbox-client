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

  $(document).on('click', '.username', function() {

    var val = $(this).text();
    console.log(val);
    app.handleUsernameClick(val);
  });

  $("form").submit(function(e) {
    e.preventDefault();
  });

  $('#roomSelect').on('change', function() {
    app.room = $('#roomSelect').find(":selected").text();
    $('li').hide();

    if (app.room === 'lobby') {
      $('.lobby').show();
    } else if (app.room === 'solo') {
      $('.solo').show();
    } else if (app.room === 'all') {
      $('li').show();
    }

  });


});

var app = {

  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages/',
  friends: {},
  latestId: 0,
  room: 'lobby',

  init: function() {

    app.fetch();

    // fetch new messages every second
    setInterval(function(){
      app.fetch();
    }, 3000);

    // setInterval(function() {
    //   // loop through friends list
    //   for (var key in app.friends) {
    //     // select all messages with class of key
    //     // $('.' + key).css("font-weight", "bold");
    //     // targeting the text value of a span element, see if it equals key
    //     console.log(this);
    //     // set css font-weight to bold
    //   }
    // }, 1000);

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
          // clean data
          app.cleanData(data);
          // convert data
          app.convertData(data);
          // render message
          app.renderMessage(data);
          // latestId is first list item on chat
          app.latestId = mostRecent.objectId;
        }
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
    app.clearMessages();

    // if the data was received from the user
    if (data.results === undefined) {
      var post = '<span class="username">' + data.username + '</span>: ' + data.text;
      $('#chats').append('<li class="message ' + data.roomname + '">' + post + '</li>');

    // else, if the data was received from the server
    } else {
      for (var i = 0; i < data.results.length; i++) {
        var msg = data.results[i];
        var post = '<span class="username">' + msg.username + '</span>: ' + msg.text;

        // if there is no room name, put to all
        if (msg.roomname === undefined) {
          $('#chats').append('<li class="message all">' + post + '</li>');
        } else {
          $('#chats').append('<li class="message ' + msg.roomname + msg.username + '">' + post + '</li>');
        }
      }
    }
  },

  renderRoom: function(room) {
    // should be able to add rooms to the DOM
    $('#roomSelect').prepend('<option value="' + room + '">' + room + '"</option>');

  },

  handleUsernameClick: function(val) {
    app.friends[val] = val;
    console.log('friend added');
    console.log(app.friends);
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
    data.roomname = app.room;

    // send data object to api
    app.send(data);
  },

  cleanData: function(data) {

    for (var i = 0; i < data.results.length; i++) {
      data.results[i].username = encodeURI(data.results[i].username);
      data.results[i].text = encodeURI(data.results[i].text);
    }

    return data;
  },

  convertData: function(data) {
    for(var i = 0; i <data.results.length; i++) {
      // look for certain characters and change them back from entity equivalents
      // !, ?, space, comma
      data.results[i].username = data.results[i].username.replace(/%20/g, ' ').replace(/&comma;/g, ',').replace(/&excl;/g, '!').replace(/&quest;/g, '?');
      data.results[i].text = data.results[i].text.replace(/%20/g, ' ').replace(/&comma;/g, ',').replace(/&excl;/g, '!').replace(/&quest;/g, '?');
    }
  }




  // escape: function(message) {
  //   return message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/''/g, '&quot;').replace(/'/g, '&apos;').replace(/`/g, '&grave;').replace..replace(/@/g, '&commat;').replace(/$/g, '&dollar;').replace(/%/g, '&percent;').replace(/\(/g, '&lpar;').replace( /\)/g, '&rpar;').replace(/=/g, '&equals;').replace(/\+/g, '&plus;').replace(/{/g, '&lcub;').replace(/}/g, '&rcub;').replace(/\[/g, '&lsqb;').replace(/]/g, '&rsqb;');
  // }


};

/*
    return message.replace(/</g, '').replace(/>/g, '').replace(/'/g, '').replace(/`/g, '')replace(/$/g, '').replace(/%/g, '').replace(/\(/g, '').replace( /\)/g, '').replace(/=/g, '').replace(/\+/g, '').replace(/{/g, '').replace(/\[/g, '').replace(/]/g, '');
*/
