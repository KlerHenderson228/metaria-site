(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const loading = form.querySelector('.loading');
      const errorEl = form.querySelector('.error-message');
      const sentEl = form.querySelector('.sent-message');

      loading.classList.add('d-block');
      errorEl.classList.remove('d-block');
      sentEl.classList.remove('d-block');

      let action = form.getAttribute('action');
      if (!action) {
        displayError(form, "Form action is not set!");
        return;
      }

      let formData = new FormData(form);

      // Optional: handle recaptcha
      let recaptchaKey = form.getAttribute('data-recaptcha-site-key');
      if (recaptchaKey && typeof grecaptcha !== "undefined") {
        grecaptcha.ready(function() {
          grecaptcha.execute(recaptchaKey, {action: 'submit'}).then(token => {
            formData.set('g-recaptcha-response', token);
            submitToFormspree(form, action, formData);
          });
        });
      } else {
        submitToFormspree(form, action, formData);
      }
    });
  });

  function submitToFormspree(form, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
      form.querySelector('.loading').classList.remove('d-block');
      if (data.ok) {
        form.querySelector('.sent-message').classList.add('d-block');
        form.reset();
      } else {
        let errorMsg = data?.errors?.map(e => e.message).join(", ") || "Form submission failed.";
        displayError(form, errorMsg);
      }
    })
    .catch(error => {
      form.querySelector('.loading').classList.remove('d-block');
      displayError(form, error.message);
    });
  }

  function displayError(form, error) {
    const errorEl = form.querySelector('.error-message');
    errorEl.innerHTML = error;
    errorEl.classList.add('d-block');
  }

})();
