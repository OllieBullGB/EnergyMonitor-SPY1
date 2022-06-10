/**
 * 
 *  Filename: SolarArrayModel.js
 * 
 *  Date: 4th June 2022
 * 
 *  Description: A class to predict the output of a solar 
 *               array given information about the array 
 *               and the global intensity at that time
 * 
 *  Version: v1.0 04/06/22, v1.1 07/06/22, v1.1 09/06/22
 * 
 */


const IntensityCalculator = require('./IntensityCalculator');

class SolarArrayModel
{
    constructor(intensityCalculator, area, angle, direction, cloudCover, temperature)
    {
        this.intensityCalculator = intensityCalculator;
        this.area = area; // m^2
        this.angle = angle; // deg
        this.direction = direction; // deg
        this.cloudCover = cloudCover; // decimal
        this.temperature = temperature; // kelvin
    }

    setCloudCover(cloudCover)
    {
        this.cloudCover = cloudCover;
    }

    setTemperature(temperature)
    {
        this.temperature = temperature;
    }

    getTemperatureCoefficient()
    {
        if(this.temperature - 298 > 0)
        {
            return 1 - ((this.temperature - 298) / 100);
        }
        else
        {
            return 1;
        }
    }

    getCloudCoverCoefficient()
    {
        return (100 - this.cloudCover) / 100;
    }

    getIncidentIntensity()
    {
        let globalIntensity = this.intensityCalculator.getGlobalIntensity();
        let coefficient = this.getTemperatureCoefficient() * this.getCloudCoverCoefficient();
        let incidentIntensity = globalIntensity * coefficient;
        return incidentIntensity;
    }

    getPower()
    {
        let rElevation = IntensityCalculator.degToRad(this.intensityCalculator.getElevation());
        let rAzimuth = IntensityCalculator.degToRad(this.intensityCalculator.getAzimuth());
        let rAngle = IntensityCalculator.degToRad(this.angle);
        let rDirection = IntensityCalculator.degToRad(this.direction);
        let incidentIntensity = this.getIncidentIntensity();

        let moduleRadiation = incidentIntensity * ( Math.cos(rElevation) * Math.sin(rAngle) * Math.cos(rDirection - rAzimuth) + Math.sin(rElevation) * Math.sin(rAngle));
        moduleRadiation = moduleRadiation * this.area;
        return moduleRadiation;
    }

    getRealisticPower()
    {
        //Asssuming the panel has a 20% efficiency
        return this.getPower() * 0.2;
    }
}

module.exports = SolarArrayModel;