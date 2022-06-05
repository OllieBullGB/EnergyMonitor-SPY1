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
        return 1 - this.cloudCover;
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
        let elevation = IntensityCalculator.degToRad(this.intensityCalculator.getElevation());
        let azimuth = IntensityCalculator.degToRad(this.intensityCalculator.getAzimuth());
        let rAngle = IntensityCalculator.degToRad(this.angle);
        let rDirection = IntensityCalculator.degToRad(this.direction);
        let incidentIntensity = this.getIncidentIntensity();

        let moduleRadiation = incidentIntensity * ( Math.cos(elevation) * Math.sin(rAngle) * Math.cos(rDirection - azimuth) + Math.sin(elevation) * Math.sin(rAngle));
        return moduleRadiation;
    }
}