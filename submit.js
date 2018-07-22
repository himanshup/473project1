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

//JavaScript for disabling form submissions if there are invalid fields
// function validateForm() {
//   'use strict';
//   window.addEventListener('load', function () {
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.getElementsByClassName('needs-validation');
//     // Loop over them and prevent submission
//     var validation = Array.prototype.filter.call(forms, function (form) {
//       form.addEventListener('submit', function (event) {
//         if (form.checkValidity() === false) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   }, false);
// }
