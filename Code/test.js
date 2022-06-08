/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

/* clear sky, few clouds, scattered clouds/broken clouds, shower rain/rain, thunderstorm, snow, mist*/
const weatherIcons = ["sunny", "partly_cloudy_day", "cloudy", "rainy", "thunderstorm", "snowing", "foggy" ];

let els = document.getElementsByClassName("myClass");

function toggleDarkMode() {	
   Array.from(els).forEach(element => element.classList.toggle("dark-mode"));
}



