$(doument).ready(function(){

  $('#sumbit').click(function() {
    // take data that was input by user in #input
    var dirtyData = $('#input').text();
    // run dirtyData through sanitizeHTML
    // store that sanitized data into a variable
    var cleanData = sanitizeHTML(dirtyData);
    // send that variable to send method
    app.send(cleanData).bind(app);
  });

});

var sanitizeHtml = require('sanitize-html');