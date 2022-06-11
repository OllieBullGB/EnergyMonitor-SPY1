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


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) 
{
  if (e.target.checked) 
  {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
	document.getElementById("dark_mode").innerHTML = 
		`
			Light Mode
			<span class="material-symbols-outlined mediumIcon">
				light_mode
			</span>
		`;
  }
  else 
  {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
	document.getElementById("dark_mode").innerHTML = 
		`
			Dark Mode
			<span class="material-symbols-outlined mediumIcon">
				dark_mode
			</span>
		`;
  }    
}

if(toggleSwitch) 
{
	toggleSwitch.addEventListener('change', switchTheme, false);
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) 
{
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') 
    {
      if(toggleSwitch) 
      {
        toggleSwitch.checked = true;
      }
    }
}