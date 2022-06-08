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




const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light'); //add this
    }    
}

if(toggleSwitch) {
toggleSwitch.addEventListener('change', switchTheme, false);
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
		if(toggleSwitch) {
			toggleSwitch.checked = true;
		}
    }
}