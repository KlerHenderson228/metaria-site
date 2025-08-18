document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // stay on page

    const loading = form.querySelector(".loading");
    const errorEl = form.querySelector(".error-message");
    const sentEl = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorEl.style.display = "none";
    sentEl.style.display = "none";

    const formData = new FormData(form);

    fetch("https://formspree.io/f/mjkodanr", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
      loading.style.display = "none";
      if (data.ok) {
        sentEl.style.display = "block";
        form.reset();
      } else {
        errorEl.textContent = "Form submission failed.";
        errorEl.style.display = "block";
      }
    })
    .catch(error => {
      loading.style.display = "none";
      errorEl.textContent = error.message;
      errorEl.style.display = "block";
    });
  });
});
