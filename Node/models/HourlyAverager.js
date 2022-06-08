class HourlyAverager
{
    constructor(weatherPoints, solarArrayModel)
    {
        this.weatherPoints = weatherPoints;
        this.solarArrayModel = solarArrayModel;
    }

    calculatePower()
    {
        let output = [];
        this.weatherPoints.forEach((weatherPoint) =>
        {
            this.solarArrayModel.intensityCalculator.setDatetime(new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US"))
            this.solarArrayModel.intensityCalculator.setAltitude(weatherPoint.altitude);
            this.solarArrayModel.setCloudCover(weatherPoint.getCloudCover());
            this.solarArrayModel.setTemperature(weatherPoint.getTemp());

            let power = this.solarArrayModel.getRealisticPower();
            if(power < 0) power = 0;

            let weatherPointOutput = 
            {
                "dateTime": weatherPoint.dateTime,
                "weatherType": `${weatherPoint.weatherName}`,
                "weatherIcon": `${weatherPoint.weatherIcon}`,
                "power": power
            };
            output.push(weatherPointOutput);
            weatherPointOutput.dateTime = parseInt(weatherPointOutput.dateTime) + 3600;
            output.push(weatherPointOutput);
            weatherPointOutput.dateTime = parseInt(weatherPointOutput.dateTime) + 3600;
            output.push(weatherPointOutput);
        })
        return output;
    }
}

module.exports = HourlyAverager;