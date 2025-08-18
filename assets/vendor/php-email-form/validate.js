<script>
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // stay on page

    const loading = form.querySelector(".loading");
    const errorEl = form.querySelector(".error-message");
    const sentEl = form.querySelector(".sent-message");

    // Show loading, hide previous messages
    loading.style.display = "block";
    errorEl.style.display = "none";
    sentEl.style.display = "none";

    const formData = new FormData(form);

    fetch("https://formspree.io/f/mjkodanr", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
    .then(response => {
      loading.style.display = "none";
      if (response.ok) {
        sentEl.style.display = "block";
        form.reset();
      } else {
        return response.json().then(data => {
          let errorMsg = data?.errors?.map(e => e.message).join(", ") || "Form submission failed.";
          errorEl.textContent = errorMsg;
          errorEl.style.display = "block";
        });
      }
    })
    .catch(error => {
      loading.style.display = "none";
      errorEl.textContent = error.message;
      errorEl.style.display = "block";
    });
  });
});
</script>
