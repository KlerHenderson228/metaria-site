<script>
document.addEventListener("DOMContentLoaded", function() {
  // Select all forms with the class php-email-form
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      let action = form.getAttribute('action');
      if (!action) {
        displayError(form, "Form action is not set!");
        return;
      }

      // Show loading, hide previous messages
      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(form);

      // Send form data to Formspree
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        form.querySelector('.loading').classList.remove('d-block');

        if (data.ok) {
          form.querySelector('.sent-message').classList.add('d-block');
          form.reset();
        } else {
          let errorMsg = data.errors ? data.errors.map(e => e.message).join(", ") : "Form submission failed.";
          displayError(form, errorMsg);
        }
      })
      .catch(error => {
        form.querySelector('.loading').classList.remove('d-block');
        displayError(form, error.message);
      });
    });
  });

  // Function to show error messages
  function displayError(form, message) {
    let errorEl = form.querySelector('.error-message');
    errorEl.innerHTML = message;
    errorEl.classList.add('d-block');
  }
});
</script>
