class WeatherAtTime
{
    constructor(weatherInstance) 
    {
        this.dateTime = weatherInstance.dt;
        this.timezone = weatherInstance.timezone;
        this.temp = weatherInstance.main.temp;
        this.altitude = weatherInstance.main.grnd_level;
        this.weatherId = weatherInstance.weather.id;
        this.weatherName = weatherInstance.weather.main;
        this.weatherIcon = weatherInstance.weather.icon;
        this.cloudCover = weatherInstance.clouds.all;
    }

    getDateTime()
    {
        return this.dateTime;
    }

    getDate()
    {
        return new Date(this.dateTime * 1000);
    }

    getTemp()
    {
        return this.temp;
    }

    getAltitude()
    {
        return this.altitude;
    }

    getWeatherId()
    {
        return this.weatherId;
    }

    getWeatherName()
    {
        return this.weatherName;
    }

    getWeatherIcon()
    {
        return this.weatherIcon;
    }

    getCloudCover()
    {
        return this.cloudCover;
    }
}