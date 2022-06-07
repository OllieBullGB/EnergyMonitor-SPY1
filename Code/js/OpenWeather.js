class OpenWeather 
{
    constructor(latitude, longitude, apiKey)
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.apiKey = apiKey;

        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const res = await axios(url);
        console.table(res);

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
