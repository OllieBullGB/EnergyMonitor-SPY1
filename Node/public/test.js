/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
document.getElementsByClassName("icon")[0].addEventListener("click", () => 
{
  toggleNavigationMenu();
})

function toggleNavigationMenu() 
{
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") 
  {
    x.style.display = "none";
  } else 
  {
    x.style.display = "block";
  }
}

var link = "hourly.html?day=\""

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear() - 2000;

if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  m = '0' + mm
}
var today = mm + '/' + dd + '/' + yyyy + '"';


document.getElementById("hourly-link").href = link.concat(today);
