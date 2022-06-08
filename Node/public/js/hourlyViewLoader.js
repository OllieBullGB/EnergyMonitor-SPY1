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
console.log(time);
//get parameters required to query api
const position = LocalDataManager.getLocation();
const panelInfo = LocalDataManager.getPanelInfo();

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
        let date = new Date(dataPoint.dateTime * 1000);
        let targetDate = new Date(selectedDate);
        targetDate = new Date(targetDate.getTime() + 86400000);
        let icon = weatherIcons[dataPoint.weatherIcon];
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yy = String(date.getFullYear().toString().substring(2,4));
        let dateStr = dd + "/" + mm ;
        let link = `daily.html?day="${mm}/${dd}/${yy}"`;

        if(date.toISOString().slice(0, 10) == targetDate.toISOString().slice(0, 10))
        {
            solarInput = Math.round((dataPoint.power + Number.EPSILON) * 100 * 24) / 100;
            link = `hourly.html?day="${mm}/${dd}/${yy}"`;
        }
    })

    surplus = solarInput - usage;
    totalsRenderer(solarInput, usage, surplus);
}