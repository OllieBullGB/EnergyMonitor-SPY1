class WeatherAtTime
{
    constructor(weatherInstance) 
    {
        this.dateTime = weatherInstance.dt;
        this.date = new Date(weatherInstance.dt * 1000);
        this.timezone = 10;
        this.temp = weatherInstance.main.temp;
        this.altitude = weatherInstance.main.grnd_level;
        this.weatherId = weatherInstance.weather[0].id;
        this.weatherName = weatherInstance.weather[0].main;
        this.weatherIcon = weatherInstance.weather[0].icon;
        this.cloudCover = weatherInstance.clouds.all;
    }

    getDateTime()
    {
        return this.dateTime;
    }

    getDate()
    {
        return this.date;
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