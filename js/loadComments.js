// Get the container element where comments will be displayed
const commentsContainer = document.getElementById("comments-area");

// Function to load comments from the server
function loadComments() {
  // Fetch comments from the specified URL
  fetch("http://localhost/school-formation-v2/php/comments.php")
    .then((response) => response.json()) // Parse the response as JSON
    .then((res) => {
      if (res.status === "success") {
        // Check if the response status is "success"
        let comments = res.comments; // Get the comments from the response
        console.log(comments); // Log comments to the console for debugging
        commentsContainer.innerHTML = ""; // Clear the comments container

        if (typeof comments == "object") {
          // Check if comments is an object (array)
          var html = "<h2>Commentaires</h2>"; // Initialize HTML string with a header

          // Loop through each comment and build the HTML
          for (var i = 0; i < comments.length; i++) {
            html += `<div>
            <span>
              <div>
                <img src="assets/profile-icon-comments.png" alt="" />
                <h5>${comments[i].email}</h5>
              </div>
              <p>
              ${comments[i].COMMENT}
              </p>
            </span>
          </div>`;
          }

          // Set the built HTML to the comments container
          commentsContainer.innerHTML = html;
        } else {
          // If no comments are available, display a placeholder message
          commentsContainer.innerHTML =
            "<p>Aucun commentaire pour le moment.</p>";
        }
      }
    })
    .catch((error) => {
      console.error("Error loading comments:"); // Log any errors that occur during fetch
    });
}

// Call the loadComments function when the page loads
window.addEventListener("load", loadComments);
