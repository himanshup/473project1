(function(window) {
  var $ = window.jQuery;
  var SERVER_URL = 'http://localhost:2403/comments';
  var App = window.App;
  var DataBase = App.DataBase;
  var remoteDB = new DataBase(SERVER_URL);

  document.getElementById('submit-btn').addEventListener('click', function() {
    remoteDB.submitBook().then(function() {
      $('form').fadeOut('slow', function() {
        $('#submission-msg').fadeIn('slow');
      });
    });
  });
})(window);
