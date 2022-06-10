class OpenWeather 
{
    weatherPoints;

    constructor(latitude, longitude, apiKey)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.apiKey = apiKey;
        this.APIResponse = this.init();
        this.weatherPoints = [];
        this.APIResponse.list.forEach(item => 
        {
            let weatherAtTime = new WeatherAtTime(item);
            this.weatherPoints.push(weatherAtTime);
        })
    }

    setWeatherPoints(weatherPoints)
    {
        this.weatherPoints = weatherPoints;
    }

    init()
    {
        let data;
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`;
        const response = fetch(url)
        .then(res => res.json())
        .then(data => 
        {
            localStorage.setItem("d", JSON.stringify(data));
        })
        .catch(err => console.log(err));
        return JSON.parse(localStorage.getItem("d"));
    }

    getHourlyWeather(day) 
    {
        day = new Date(day);
        let dayWeather = [];
        this.weatherPoints.forEach(element => 
        {
            if(element.getDay() === day.getDay())
            {
                dayWeather.push(element);
            }
        })
    }

    getFiveDayWeather()
    {
        return this.weatherPoints;
    }
}



