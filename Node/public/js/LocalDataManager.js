class LocalDataManager
{

    //Given an average daily usage in kWh, cache the usage
    static setUsage(usage)
    {
        localStorage.setItem("usage", usage + " ");
        return LocalDataManager.getUsage();
    }

    //given a stored usage statistic, return the average usage
    static getUsage()
    {
        let usage = localStorage.getItem("usage");

        usage = parseFloat(usage);
        
        let output = 
        {
            "usage": usage,
            "hourlyUsage": Math.round((usage + Number.EPSILON) * 100) / 100 //Round to 2 decimal places 
        }

        return output;
    }

    static setCity(cityName)
    {
        localStorage.setItem('city', cityName);
        return LocalDataManager.getCity();
    }

    static getCity()
    {
        let city = localStorage.getItem('city');

        let output =
        {
            "city": city
        };

        return output;
    }

    static wipeCity()
    {
        localStorage.removeItem('city');
    }

    //Given a latitude and longitude, cache the location
    static setLocation(latitude, longitude)
    {
        localStorage.setItem('latitude', latitude + " ");
        localStorage.setItem('longitude', longitude + " ");
        return LocalDataManager.getLocation();
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
        return LocalDataManager.getPanelInfo();
    }

    static setArea(area)
    {
        localStorage.setItem("area", area + " ");
        return LocalDataManager.getPanelInfo();
    }

    static setAngle(angle)
    {
        localStorage.setItem("angle", angle + " ");
        return LocalDataManager.getPanelInfo();
    }

    static setDirection(direction)
    {
        localStorage.setItem("direction", direction + " ");
        return LocalDataManager.getPanelInfo();
    }

    //given a stored solar array, get the array information
    static getPanelInfo()
    {
        let area = localStorage.getItem("area") || 0;
        let angle = localStorage.getItem("angle") || 0;
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
        return 1;
    }
}

