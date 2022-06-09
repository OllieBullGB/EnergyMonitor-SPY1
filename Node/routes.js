const OpenWeather = require('./models/OpenWeather');
const IntensityCalculator = require('./models/IntensityCalculator');
const SolarArrayModel = require('./models/SolarArrayModel');
const HourlyAverager = require('./models/HourlyAverager');
const DailyAverager = require('./models/DailyAverager');

module.exports = function(app) {
    app.all('/api/solar', (req, res) => {
    	console.info("Request received");
        
        let day = req.body.day;
        let latitude = req.body.lat;
        let longitude = req.body.long;

        let area = req.body.area;
        let angle = req.body.angle;
        let direction = req.body.direction;

        let weather = new OpenWeather(latitude, longitude, "c35428e96cf1836d8d2d58f7eaf046eb");
        let data;
        
        if(day != undefined && day != '')
        {
            console.log("day");
            let weatherPoints = weather.getHourlyWeather(day);
            let dateTime = new Date().toLocaleString("en-US");
            let intensityCalculator = new IntensityCalculator(dateTime, latitude, longitude, 0);
            let solarArrayModel = new SolarArrayModel(intensityCalculator, area, angle, direction, 0, 273);
        
            let hourlyAverager = new HourlyAverager(weatherPoints, solarArrayModel);
            data = hourlyAverager.calculatePower();
        }
        else
        {
            let weatherPoints = weather.getFiveDayWeather();
            let dateTime = new Date(weatherPoints[0].dateTime * 1000).toLocaleString("en-US");
            let intensityCalculator = new IntensityCalculator(dateTime, latitude, longitude, 0);
            let solarArrayModel = new SolarArrayModel(intensityCalculator, area, angle, direction, 0, 273);

            let dailyAverager = new DailyAverager(weatherPoints, solarArrayModel);
            data = dailyAverager.calculatePower();
        }

        console.table(data);
        res.status(200).json(data);
    });

    app.all('/api/', (req, res) => {
        res.status(200).json({message: "server active"});
    });
}
