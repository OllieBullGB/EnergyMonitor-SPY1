/**
 * 
 *  Filename: HourlyAverager.js
 * 
 *  Date: 9th June 2022
 * 
 *  Description: A class to return the average solar power per hour
 *               and average weather conditions, given an input of 
 *               WeatherAtTime instances representing a single day
 * 
 *  Version: v1.0 09/06/22, v1.1 10/06/22
 * 
 */

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
            //configure the intensity calculator for this specific weatherPoint
            this.solarArrayModel.intensityCalculator.setDatetime(new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US"))
            this.solarArrayModel.intensityCalculator.setAltitude(weatherPoint.altitude);
            this.solarArrayModel.setCloudCover(weatherPoint.getCloudCover());
            this.solarArrayModel.setTemperature(weatherPoint.getTemp());

            //get the power output of the weatherPoint
            let power = this.solarArrayModel.getRealisticPower();
            if(power < 0) power = 0;

            //create an object representing the weatherPoints solar output
            let weatherPointOutput = 
            {
                "dateTime": weatherPoint.dateTime,
                "weatherType": `${weatherPoint.weatherName}`,
                "weatherIcon": `${weatherPoint.weatherIcon}`,
                "power": power
            };
            output.push(weatherPointOutput);
            //pad the next two hours with the same output to create an array representing all 24 hours
            let weatherPointOneHourAhead = 
            {
                "dateTime": parseInt(weatherPoint.dateTime) + 3600,
                "weatherType": `${weatherPoint.weatherName}`,
                "weatherIcon": `${weatherPoint.weatherIcon}`,
                "power": power
            }
            output.push(weatherPointOneHourAhead);
            let weatherPointTwoHoursAhead = 
            {
                "dateTime": parseInt(weatherPoint.dateTime) + 7200,
                "weatherType": `${weatherPoint.weatherName}`,
                "weatherIcon": `${weatherPoint.weatherIcon}`,
                "power": power
            }
            output.push(weatherPointTwoHoursAhead);
        })
        return output;
    }
}

module.exports = HourlyAverager;