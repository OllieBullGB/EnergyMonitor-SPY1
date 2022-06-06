async function fetchSolarData(latitude, longitude)
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
        body: JSON.stringify({lat: `${latitude}`, long: `${longitude}`})
    });
    return res.json();
}

function dailySolarData(solarData)
{

}

function periodicSolarData(solarData)
{
    
}
