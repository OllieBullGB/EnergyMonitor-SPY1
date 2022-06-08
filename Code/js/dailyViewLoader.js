const slider = document.getElementById("days-list");
const now = new Date();
//Render for daily view;

const city = LocalDataManager.getCity();
document.getElementById("city-name").innerHTML =
`
<var>${city.city}</var>
`

//get parameters required to query api
const position = LocalDataManager.getLocation();
const panelInfo = LocalDataManager.getPanelInfo();

for(i=0; i<5; i++)
{
    let then = new Date(now.getTime() + (i * 86400000));
    let dd = String(then.getDate()).padStart(2, '0');
    let mm = String(then.getMonth() + 1).padStart(2, '0');
    let yy = String(then.getFullYear().toString().substring(2,4));
    let thenDate = dd + "/" + mm ;
    let link = `hourly.html?day="${mm}/${dd}/${yy}"`;
    containerRenderer(thenDate, link, 'partly_cloudy_day', slider);
}