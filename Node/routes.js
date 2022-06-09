module.exports = function(app) {
    //Dependencies
    const OpenWeather = require('./models/OpenWeather');
    
    app.all('/api/solar', (req, res) => {
    	console.info("Request received");
        console.table(req.body);
        //Handle weather
        let weather = new OpenWeather(req.body.lat,req.body.lon,
                                      "c35428e96cf1836d8d2d58f7eaf046eb");
        if (req.body.day != undefined) {
            let weatherPoints = weather.getHourlyWeather(req.body.day)
            let time = new Date(weatherPoints[0].dateTime * 1000).toLocaleString("en-US");
            let intensity = new IntensityCalculator(time, req.body.lat, req.body.lon, 0);
            let solar = new SolarArrayModel(intensity, req.body.area, req.body.angle,
                                            req.body.direction, 0, 273);
            let hourly = new HourlyAverager(weatherPoints, solar);
            let data = hourly.calculatePower();
        } else {
            let weatherPoints = weather.getFiveDayWeather();
            let intensity = new IntensityCalculator(time, req.body.lat, req.body.lon, 0);
            let solar = new SolarArrayModel(intensity, req.body.area, req.body.angle,
                                            req.body.direction, 0, 273);
            let daily = new DailyAverager(weatherPoints, solar);
            let data = daily.calculatePower();
        }
        res.status(200).json(data);
    });
}
