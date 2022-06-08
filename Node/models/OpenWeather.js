const WeatherAtTime = require('./WeatherAtTime');
const fetch = require('node-fetch');
const HandyStorage = require('handy-storage');
const store = new HandyStorage('./store.json');

class OpenWeather 
{
    weatherPoints;

    constructor(latitude, longitude, apiKey)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.apiKey = apiKey;
        this.APIResponse = this.init(store);
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

    init(store)
    {
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`;
        const response = fetch(url)
        .then(res => res.json())
        .then(data => 
        {
            store.setState(data);
        })
        .catch(err => console.log(err));
        let data = store.state;
        return data;
    }

    getHourlyWeather(day) 
    {
        day = new Date(day);
        let dayWeather = [];
        this.weatherPoints.forEach(element => 
        {
            if(element.getDate().getUTCDate() === day.getUTCDate() + 1)
            {
                dayWeather.push(element);
            }
        })
        return dayWeather;
    }

    getFiveDayWeather()
    {
        return this.weatherPoints;
    }
}

module.exports = OpenWeather;


