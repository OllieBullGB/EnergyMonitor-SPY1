async function fetchSolarData(frequency, latitude, longitude, area, angle, direction)
{
    const res = fetch("/api/solar",
    {
        method: "get",
        mode: "no-cors",
        cache: "force-cache",
        headers: 
        {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify
        ({
            frequency: `${frequency}`, //H for hourly, D for daily
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

    let data = fetchSolarData("D", position.latitude, position.longitude, panelInfo.area, panelInfo.angle, panelInfo.direction);

    let solarInput = 0;
    let surplus = 0;

    data.forEach(datapoint =>
    {
        let currentDate = new Date(datapoint.dateTime);
        let dd = String(then.getDate()).padStart(2, '0');
        let mm = String(then.getMonth() + 1).padStart(2, '0');
        let dateFormat = dd + "/" + mm;
        containerRenderer(dateFormat, datapoint.icon, container);

        if(currentDate.getTime() == selectedDate.getTime())
        {
            solarInput = datapoint.power;
        }
    })

    surplus = solarInput - usage;
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

function containerRenderer(timeStr, weatherIconName, container)
{
    let hourContainer = document.createElement("div");
    hourContainer.classList.add("day");
    hourContainer.innerHTML = 
    `
    <a href="hourly.html/date='${timeStr}'" onclick="myFunction()">
        <var>${timeStr}</var>
    </a>
    `;

    container.appendChild(hourContainer);
}

const slider = document.getElementById("days-list");
const now = new Date();
for(i=0; i<5; i++)
{
    let then = new Date(now.getTime() + (i * 86400000));
    let dd = String(then.getDate()).padStart(2, '0');
    let mm = String(then.getMonth() + 1).padStart(2, '0');
    let thenDate = dd + "/" + mm;
    containerRenderer(thenDate, '', slider);
}

