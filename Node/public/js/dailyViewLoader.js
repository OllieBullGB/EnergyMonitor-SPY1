const slider = document.getElementById("days-list");
const now = new Date();
//Render for daily view

const city = LocalDataManager.getCity();
document.getElementById("city-name").innerHTML =
`
<var>${city.city}</var>
`
const urlParams = new URLSearchParams(window.location.search);
const day = urlParams.get("day") || new Date().toISOString().slice(0, 10);

dailySolarData(slider, day);

function dailySolarData(container, selectedDate)
{
    let position = LocalDataManager.getLocation();
    let panelInfo = LocalDataManager.getPanelInfo();
    let usage = LocalDataManager.getUsage().usage;

    let data = fetchSolarData('', position.latitude, position.longitude, panelInfo.area, panelInfo.angle, panelInfo.direction);

    let solarInput = 0;
    let surplus = 0;

    data.forEach(dataPoint =>
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

        containerRenderer(dateStr, link, icon, container);

        console.log("D", date.toISOString().slice(0, 10));
        console.log("TD", targetDate.toISOString().slice(0, 10));
        
    })

    surplus = solarInput - usage;
    totalsRenderer(solarInput, usage, surplus)
}

