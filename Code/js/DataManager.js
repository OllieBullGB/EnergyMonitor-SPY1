class DataManager
{
    //Given a latitude and longitude, cache the location
    static setLocation(latitude, longitude)
    {
        localStorage['latitude'] = latitude + " ";
        localStorage['longitude'] = longitude + " ";
    }

    //given a stored location, get the latitude and longitude
    static getLocation()
    {
        let latitude =localStorage['latitude'] || 10.6891;
        let longitude = localStorage['longitude'] || 142.5316;

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);

        let output = 
        {
            "latitude": latitude,
            "longitude": longitude
        }
        return output;
    }

    //Given solar panel information, cache the information
    static setPanelInfo(area, angle, direction)
    {
        localStorage['area'] = area + " ";
        localStorage['angle'] = angle + " ";
        localStorage['direction'] = direction + " ";
    }

    //given a stored solar array, get the array information
    static getPanelInfo()
    {
        let area = localStorage['area'] || -1;
        let angle = localStorage['angle'] || 45;
        let direction = localStorage['direction'] || 0;

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
}

