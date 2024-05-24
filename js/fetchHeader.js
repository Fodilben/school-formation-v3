// Get the container element for the header
const headerContainer = document.getElementById("header-container");

// Get the container element for the navbar
const navbarContainer = document.getElementById("nav-container");

// Fetch the header HTML from a separate file and insert it into the header container
fetch("./header.html")
  .then((response) => response.text()) // Parse the response as text
  .then((html) => {
    headerContainer.innerHTML = html; // Set the inner HTML of the header container
  })
  .catch((error) => {
    console.error("Error loading header:", error); // Log any errors that occur
  });

// Fetch the navbar HTML from a separate file and insert it into the navbar container
fetch("./nav.html")
  .then((response) => response.text()) // Parse the response as text
  .then((html) => {
    navbarContainer.innerHTML = html; // Set the inner HTML of the navbar container
  })
  .catch((error) => {
    console.error("Error loading navbar:", error); // Log any errors that occur
  });
