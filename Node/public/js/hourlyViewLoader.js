const slider = document.getElementById("days-list");
const now = new Date();

const city = LocalDataManager.getCity();
document.getElementById("city-name").innerHTML =
`
<var>${city.city}</var>
`

//get day parameter from url
const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get("day");
const time = urlParams.get("time") || "00:00";

//get parameters required to query api
const position = LocalDataManager.getLocation();
const panelInfo = LocalDataManager.getPanelInfo();

hourlySolarData(day, slider, time);

function hourlySolarData(day, container, selectedHour)
{
    let position = LocalDataManager.getLocation();
    let panelInfo = LocalDataManager.getPanelInfo();
    let usage = LocalDataManager.getUsage().usage;
    console.log(day);

    let data = fetchSolarData(day, position.latitude, position.longitude, panelInfo.area, panelInfo.angle, panelInfo.direction);
    console.table(data);

    let solarInput = 0;
    let surplus = 0;

    data.forEach(dataPoint =>
    {
        let date = new Date(dataPoint.dateTime * 1000);
        let targetDate = new Date(dataPoint.dateTime * 1000);
        let icon = weatherIcons[dataPoint.weatherIcon];
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yy = String(date.getFullYear().toString().substring(2,4));
        let hour = String(date.getHours()).padStart(2, '0');
        let min = String(date.getMinutes()).padStart(2, '0')
        let timeStr = hour + ":" + min;
        let dateStr = dd + "/" + mm ;
        let link = `daily.html?day="${mm}/${dd}/${yy}?time="${timeStr}"`;

        console.log("D", date.toISOString().slice(11, 16));
        console.log("TD", targetDate.toISOString().slice(11, 16));
        if(date.toISOString().slice(11, 16) == targetDate.toISOString().slice(11, 16))
        {
            solarInput = Math.round((dataPoint.power + Number.EPSILON) * 100 * 24) / 100;
            link = `daily.html"`;
        }

        containerRenderer(timeStr, link, icon, container);
    })

    surplus = solarInput - usage;
    totalsRenderer(solarInput, usage, surplus);
}