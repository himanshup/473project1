submitMessage();

function submitMessage() {
  document.getElementById('submit-btn').addEventListener('click', function () {
    $('form').fadeOut('slow', function () {
      $('#submission-msg').fadeIn('slow');
      // setTimeout(location.reload.bind(location), 6000);
    });
  });
}

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