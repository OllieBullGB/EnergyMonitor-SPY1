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
        let i = 0;
        

        this.weatherPoints.forEach((weatherPoint) =>
        {
            this.solarArrayModel.intensityCalculator.setDatetime(new Date(weatherPoint.dateTime * 1000).toLocaleString("en-US"))
            this.solarArrayModel.intensityCalculator.setAltitude(weatherPoint.altitude);
            this.solarArrayModel.setCloudCover(weatherPoint.getCloudCover());
            this.solarArrayModel.setTemperature(weatherPoint.getTemp());

            let power = this.solarArrayModel.getRealisticPower();
            if(power < 0) power = 0;

            let currentDay = new Date(weatherPoint.dateTime * 1000).toISOString().slice(0, 10);
            if(output[0] === undefined)
            {
                console.log("start");
                output[output.length] = 
                {
                    "dateTime": weatherPoint.dateTime,
                    "numPoints": 1,
                    "weatherType": `few clouds`,
                    "weatherIcon": `02d`,
                    "power": (power * 3) / 8
                };
            }
            else if(currentDay == new Date(output[output.length-1].dateTime * 1000).toISOString().slice(0, 10))
            {
                output[output.length-1].power = output[output.length-1].power + ((power * 3) / 8);
                output[output.length-1].numPoints++;
            }
            else
            {
                output[output.length] = 
                {
                    "dateTime": weatherPoint.dateTime,
                    "numPoints": 1,
                    "weatherType": `few clouds`,
                    "weatherIcon": `02d`,
                    "power": (power * 3) / 8
                };
            }
        })
        return output;
    }
}

module.exports = DailyAverager;