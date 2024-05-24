document.addEventListener("DOMContentLoaded", function () {
  var commentForm = document.getElementById("commentForm");

  // Event listener for the comment form submission
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("email").value;
    var comment = document.getElementById("comment").value;

    if (email && comment) {
      // Check if both email and comment are provided
      fetch("http://localhost/school-formation-v2/php/comments.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          // Encode the email and comment to be safely included in the URL
          "email=" +
          encodeURIComponent(email) +
          "&comment=" +
          encodeURIComponent(comment),
      })
        .then(function (response) {
          return response.json(); // Parse the response as JSON
        })
        .then(function (data) {
          if (data.status === "success") {
            console.log(data.message); // Log success message
            window.location.reload(); // Reload the page to show the new comment
          } else {
            console.error(data.message); // Log error message if submission failed
          }
        })
        .catch(function (error) {
          console.error("Error submitting comment:", error); // Log any errors that occur during fetch
        });
    }
  });
});
