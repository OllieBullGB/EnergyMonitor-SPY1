class OpenWeather 
{
    weatherPoints;

    constructor(latitude, longitude, apiKey, weatherPoints)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.apiKey = apiKey;
        this.weatherPoints = this.init();
    }

    async init()
    {
        let data;
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}`;
        const response = fetch(url)
        .then(res => res.json())
        .then(data => 
        {
            console.table(data);
            return data;
        })
        .catch(err => console.log(err));
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
