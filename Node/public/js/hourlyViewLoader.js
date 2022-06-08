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

//Render for hourly view
for(i=0; i<24; i++)
{
    let then = new Date(1654470000000 + (i * 3600000));
    let dd = String(then.getDate()).padStart(2, '0');
    let mm = String(then.getMonth() + 1).padStart(2, '0');
    let yy = String(then.getFullYear().toString().substring(2,4));
    let hour = String(then.getHours()).padStart(2, '0');
    let min = String(then.getMinutes()).padStart(2, '0');
    let thenTime = hour + ":" + min ;
    let link = `hourly.html?day="${mm}/${dd}/${yy}"&time="${hour}:${min}`;
    containerRenderer(thenTime, link, 'partly_cloudy_day', slider);
}