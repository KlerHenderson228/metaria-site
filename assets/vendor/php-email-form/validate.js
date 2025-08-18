<script>
document.addEventListener("DOMContentLoaded", function() {
  const forms = document.querySelectorAll('.php-email-form');

  forms.forEach(form => {
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Stop the browser from submitting the form

      // Show loading, hide previous messages
      form.querySelector('.loading').classList.add('d-block');
      form.querySelector('.error-message').classList.remove('d-block');
      form.querySelector('.sent-message').classList.remove('d-block');

      const action = form.getAttribute('action');
      if (!action) {
        showError(form, "Form action is not set!");
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        const data = await response.json();
        form.querySelector('.loading').classList.remove('d-block');

        if (data.ok) {
          form.querySelector('.sent-message').classList.add('d-block');
          form.reset();
        } else {
          const msg = data.errors ? data.errors.map(e => e.message).join(", ") : "Form submission failed.";
          showError(form, msg);
        }
      } catch (error) {
        form.querySelector('.loading').classList.remove('d-block');
        showError(form, error.message);
      }
    });
  });

  function showError(form, message) {
    const errorEl = form.querySelector('.error-message');
    errorEl.textContent = message;
    errorEl.classList.add('d-block');
  }
});
</script>
