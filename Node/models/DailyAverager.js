/**
 * 
 *  Filename: DailyAverager.js
 * 
 *  Date: 9th June 2022
 * 
 *  Description: A class to return the average solar power per day
 *               and average weather conditions, given an input of 
 *               WeatherAtTime instances
 * 
 *  Version: v1.0 09/06/22, v1.1 10/06/22
 * 
 */

class DailyAverager
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
            if(power < 0) power = -power;

            //get mm/dd/yyyy of the weatherpoint datetime
            let currentDay = new Date(weatherPoint.dateTime * 1000).toISOString().slice(0, 10);

            //if the output is empty
            if(output[0] === undefined)
            {
                //create an object representing the first day of the forecast
                output[output.length] = 
                {
                    "dateTime": weatherPoint.dateTime,
                    "numPoints": 1,
                    "weatherType": `${weatherPoint.weatherName}`,
                    "weatherIcon": `${weatherPoint.weatherIcon}`,
                    "power": (power * 3) / 8
                };
            }
            else if(currentDay == new Date(output[output.length-1].dateTime * 1000).toISOString().slice(0, 10))
            {
                //if the weatherPoint date matches the date on the latest addition to the output
                //assume its the same day so modify the power
                console.log(new Date(weatherPoint.dateTime * 1000).getHours());
                //if the weatherPoint is midday
                if(new Date(weatherPoint.dateTime * 1000).getHours() == 13)
                {
                    output[output.length-1].weatherType = weatherPoint.weatherName;
                    output[output.length-1].weatherIcon = weatherPoint.weatherIcon;
                }
                output[output.length-1].power = output[output.length-1].power + ((power * 3) / 8);
                output[output.length-1].numPoints++;
            }
            else
            {
                //if the weatherPoint is a new day
                output[output.length] = 
                {
                    "dateTime": weatherPoint.dateTime,
                    "numPoints": 1,
                    "weatherType": `${weatherPoint.weatherName}`,
                    "weatherIcon": `${weatherPoint.weatherIcon}`,
                    "power": (power * 3) / 8
                };
            }
        })
        return output;
    }
}

module.exports = DailyAverager;