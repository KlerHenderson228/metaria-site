<script>
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent redirect

    // Show loading, hide previous messages
    document.querySelector(".loading").style.display = "block";
    document.querySelector(".error-message").style.display = "none";
    document.querySelector(".sent-message").style.display = "none";

    const formData = new FormData(form);

    fetch("https://formspree.io/f/mjkodanr", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
      document.querySelector(".loading").style.display = "none";
      if (data.ok) {
        document.querySelector(".sent-message").style.display = "block";
        form.reset();
      } else {
        document.querySelector(".error-message").textContent = "Form submission failed.";
        document.querySelector(".error-message").style.display = "block";
      }
    })
    .catch(error => {
      document.querySelector(".loading").style.display = "none";
      document.querySelector(".error-message").textContent = error.message;
      document.querySelector(".error-message").style.display = "block";
    });
  });
});
</script>
