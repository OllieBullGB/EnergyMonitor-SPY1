const request = require('supertest');
const app = require('./app');
const IntensityCalculator = require('./models/IntensityCalculator');
const SolarArrayModel = require('./models/SolarArrayModel');
const OpenWeather = require('./models/OpenWeather');

describe('Testing IntensityCalculator', () => 
{
    it('Declination angle at equinox is near 0.00 (+-0.25)', () => 
    {
        let ic = new IntensityCalculator("09/23/2022, 12:00:00");
        let declination = ic.getDeclination();

        let nearTrueDeclination = false;
        if(declination <= 0.25 && declination >= -0.25)
        {
            nearTrueDeclination = true;
        }

        expect(nearTrueDeclination).toBe(true);
    });

    it('Declination angle at solstice is near 23.45 (+-0.25)', () => 
    {
        let ic = new IntensityCalculator("06/21/2022, 12:00:00");
        let declination = ic.getDeclination();

        let nearTrueDeclination = false;
        if(declination <= 23.7 && declination >= 23.2)
        {
            nearTrueDeclination = true;
        }

        expect(nearTrueDeclination).toBe(true);
    });

    it('Calculated hour angle is near 0 at midday (+- 10)', () => 
    {
        let ic = new IntensityCalculator("06/21/2022, 12:00:00");
        let HRA = ic.getHourAngle();
        
        let nearEstimatedHRA = false;
        if(HRA <= 10 && HRA >= -10)
        {
            nearEstimatedHRA = true;
        }
        
        expect(nearEstimatedHRA).toBe(true);
    });

    it('Calculated elevation is near 90.00 at midday (+-10)', () => 
    {
        let ic = new IntensityCalculator("06/06/2022, 12:00:00");
        let elevation = ic.getElevation();
        
        let nearTrueElevation = false;
        if(elevation <= 80 && elevation >= 100)
        {
            nearTrueElevation = true;
        }
        
        expect(nearTrueElevation).toBe(true);
    });

    it('Calculated air mass is near 1 at midday (+-0.05)', () => 
    {
        let ic = new IntensityCalculator("06/06/2022, 12:00:00");
        let airMass = ic.getAirMass();
        
        let nearTrueAirMass = false;
        if(airMass <= 0.95 && airMass >= 1.05)
        {
            nearTrueAirMass = true;
        }
        
        expect(nearTrueAirMass).toBe(true);
    });
});

describe('Testing SolarArrayModel', () => 
{
    it('Calculated incident intensity is near reference value (+- 5%)', () =>
    {
        let ic = new IntensityCalculator("06/12/22, 12:00:00", 0, 0, 0);
        let sam = new SolarArrayModel(i, 1, 0, 0, 0, 273);
        let incidentIntensity = sam.getIncidentIntensity();

        let percentageDiff = (incidentIntensity - 1.0173) / 100;
        let nearTrueIntensity = false;
        if(percentageDiff <= 0.05 && percentageDiff >= -0.05)
        {
            nearTrueIntensity = true;
        }

        expect(nearTrueIntensity).toBe(true);
    });

    it('Calculated power is near reference value (+- 5%)', () =>
    {
        let ic = new IntensityCalculator("06/12/22, 12:00:00", 0, 0, 0);
        let sam = new SolarArrayModel(i, 1, 0, 0, 0, 273);
        let power = sam.getPower();

        let nearTruePower = false;
        if(power <= 0.05 && power >= 0)
        {
            nearTruePower = true;
        }

        expect(nearTruePower).toBe(true);
    })
});

