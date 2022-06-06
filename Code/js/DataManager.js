class DataManager
{
    //Given a latitude and longitude, cache the location
    static setLocation(latitude, longitude)
    {
        localStorage.setItem('latitude', latitude + " ");
        localStorage.setItem('longitude', longitude + " ");
        return DataManager.getLocation();
    }

    //given a stored location, get the latitude and longitude
    static getLocation()
    {
        let latitude = localStorage.getItem('latitude') || 10.6891;
        let longitude = localStorage.getItem('longitude') || 142.5316;

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        let output = 
        {
            "latitude": latitude,
            "longitude": longitude
        }
        return output;
    }

    static wipeLocation()
    {
        localStorage.removeItem('latitude');
        localStorage.removeItem('longitude');
        return 1;
    }

    //Given solar panel information, cache the information
    static setPanelInfo(area, angle, direction)
    {
        localStorage.setItem("area", area + " ");
        localStorage.setItem("angle", angle + " ");
        localStorage.setItem("direction", direction + " ");
        return DataManager.getPanelInfo();
    }

    //given a stored solar array, get the array information
    static getPanelInfo()
    {
        let area = localStorage.getItem("area") || -1;
        let angle = localStorage.getItem("angle") || 45;
        let direction = localStorage.getItem("direction") || 0;

        area = parseFloat(area);
        angle = parseFloat(angle);
        direction = parseFloat(direction);

        let output = 
        {
            "area": area,
            "angle": angle,
            "direction": direction
        }
        return output;
    }

    static wipePanelInfo()
    {
        localStorage.removeItem('area');
        localStorage.removeItem('angle');
        localStorage.removeItem('direction');
    }
}

