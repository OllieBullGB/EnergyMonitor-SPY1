/* clear sky, few clouds, scattered clouds/broken clouds, shower rain/rain, thunderstorm, snow, mist*/
const weatherIcons = 
{
    "01d": "sunny",
    "01n": "sunny",
    "02d": "partly_cloudy_day",
    "02n": "partly_cloudy_day",
    "03d": "partly_cloudy_day",
    "03n": "partly_cloudy_day",
    "04d": "cloudy",
    "04n": "cloudy",
    "09d": "rainy",
    "09n": "rainy",
    "10d": "rainy",
    "10n": "rainy",
    "11d": "thunderstorm",
    "11n": "thunderstorm",
    "13d": "snowing",
    "13n": "snowing",
    "50d": "foggy",
    "50n": "foggy"
};

function fetchSolarData(day, latitude, longitude, area, angle, direction)
{
    const res = fetch("http://localhost:25565/api/solar",
    {
        method: "post",
        cache: "no-cache",
        headers: 
        {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify
        ({
            day: `${day}`, //leave blank for 5DayForecast, put mm/dd/yy for hourly forecast
            lat: `${latitude}`, //degrees
            long: `${longitude}`, //degrees
            area: `${area}`, //m^2
            angle: `${angle}`, //deg from ground parallel
            direction: `${direction}` //deg from north
        })
    })
    .then(res => res.json())
    .then(data => 
    {
        localStorage.setItem("d", JSON.stringify(data));
    })
    .catch(err => console.log(err));
    return JSON.parse(localStorage.getItem("d"));
}

function totalsRenderer(power, usage, surplus)
{
    document.getElementById("power").innerHTML = 
    `
    <var>${power}</var>
    <p>
        kWh
        <span class="material-symbols-outlined">
            bolt
        </span>
    </p>
    `;

    document.getElementById("usage").innerHTML =
    `
    <var>${usage}</var>
    <p>
        kWh
        <span class="material-symbols-outlined">
            bolt
        </span>
    </p>
    `;

    document.getElementById("surplus").innerHTML =
    `
    <var>${surplus}</var>
    <p>
        kWh
        <span class="material-symbols-outlined">
            bolt
        </span>
    </p>
    `;
}

function containerRenderer(timeStr, link, weatherIconName, container, selected)
{
    let hourContainer = document.createElement("div");
    hourContainer.onclick = () => 
    {
        window.location.href=link;
    }
    hourContainer.classList.add("day");
    hourContainer.innerHTML = 
    `
    <a href='${link}'>
        <var>${timeStr}</var>
    </a>
	<a>
		<span class="material-symbols-outlined weatherIcon">
			${weatherIconName}
		</span>
	</a>
    `;

    if(selected)
    {
        hourContainer.classList.add("selected");

    }

    container.appendChild(hourContainer);
    hourContainer.focus();
}

