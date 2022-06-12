// Element that will trigger function
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Function to toggle between light mode and dark mode
function switchTheme(e) 
{
	// If dark mode get enabelled
	if (e.target.checked) 
	{
		// Set theme to dark, store in local storage, update text and icon
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
		// Set theme to light, store in local storage, update text and icon
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

// Avoid null pointers
if(toggleSwitch) 
{
	toggleSwitch.addEventListener('change', switchTheme, false);
}

// Gets saved theme
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// If there is a current theme, set theme to saved theme
if (currentTheme) 
{
	document.documentElement.setAttribute('data-theme', currentTheme);

	// If saved theme is dark, toggle switch to on
	if (currentTheme === 'dark') 
	{
		// Avoid null pointers
		if(toggleSwitch) 
		{
			toggleSwitch.checked = true;
		}
	}
}

// Code modified from:
// https://dev.to/ananyaneogi/create-a-dark-light-mode-switch-with-css-variables-34l8
// Comments added for clairty and understading