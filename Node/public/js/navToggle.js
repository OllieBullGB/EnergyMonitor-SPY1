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


