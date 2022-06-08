/* clear sky, few clouds, scattered clouds/broken clouds, shower rain/rain, thunderstorm, snow, mist*/
const weatherIcons = 
{
    "01d": "sunny",
    "01n": "sunny",
    "02d": "partly_cloudy_day",
    "02n": "partly_cloudy_day",
    "03d": "cloudy",
    "03n": "cloudy",
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

async function fetchSolarData(day, latitude, longitude, area, angle, direction)
{
    const res = fetch("/api/solar",
    {
        method: "post",
        cache: "force-cache",
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
    });
    return res.json();
}

function dailySolarData(renderFunction, container, selectedDate)
{
    let position = LocalDataManager.getLocation();
    let panelInfo = LocalDataManager.getPanelInfo();
    let usage = LocalDataManager.getUsage();

    let data = fetchSolarData(position.latitude, position.longitude, panelInfo.area, panelInfo.angle, panelInfo.direction);

    let solarInput = 0;
    let surplus = 0;

    data.forEach(datapoint =>
    {
        let currentDate = new Date(datapoint.dateTime);
        let dd = String(currentDate.getDate()).padStart(2, '0');
        let mm = String(currentDate.getMonth() + 1).padStart(2, '0');
        let yy = String(currentDate.getFullYear()).padStart(2, '0');
        let dateFormat = dd + "/" + mm;
        let link = 'hourly.html?date="dd/mm/yy"';
        containerRenderer(dateFormat, link, datapoint.weatherIcon, container);

        if(currentDate.getTime() == selectedDate.getTime())
        {
            solarInput = datapoint.power;
        }
    })

    surplus = solarInput - usage;
    totalsRenderer(solarInput, usage, surplus)
}

function hourlySolarData(day, renderFunction, container, selectedHour)
{
    let position = LocalDataManager.getLocation();
    let panelInfo = LocalDataManager.getPanelInfo();
    let usage = LocalDataManager.getUsage();

    let data = fetchSolarData(day, position.latitude, position.longitude, panelInfo.area, panelInfo.angle, panelInfo.direction);

    let solarInput = 0;
    let surplus = 0;

    data.forEach(datapoint =>
    {
        let currentDate = new Date(datapoint.dateTime);
        let hh = String(currentDate.getHours()).padStart(2, '0');
        let mm = String(currentDate.getMinutes()).padStart(2, '0');
        let dateFormat = hh + ":" + mm;
        let link = 'daily.html';
        containerRenderer(dateFormat, link, datapoint.icon, container);

        if(currentDate.getTime() == selectedHour.getTime())
        {
            solarInput = datapoint.power;
        }
    })

    surplus = solarInput - usage;
    totalsRenderer(solarInput, usage, surplus);
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

function containerRenderer(timeStr, link, weatherIconName, container)
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

    container.appendChild(hourContainer);
}

