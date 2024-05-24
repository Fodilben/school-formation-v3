// open  the side bar
function openNav() {
  document.getElementById("nav-container").style.width = "300px";
  document.getElementById("openbtn").style.display = "none";
  document.getElementById("closebtn").style.display = "block";
}
// close the side bar
function closeNav() {
  document.getElementById("nav-container").style.width = "0";
  document.getElementById("openbtn").style.display = "block";
  document.getElementById("closebtn").style.display = "none";
}
