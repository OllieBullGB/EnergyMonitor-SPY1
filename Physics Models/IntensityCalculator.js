class IntensityCalculator 
{
    constructor(dateTimeStr, latitude, longitude, altitude)
    {
        let dt = dateTimeStr.split(" ");
        this.date = new Date(dateTimeStr);
        this.J2000 = IntensityCalculator.getJ2000(dateTimeStr);
        this.daysSinceYearStart = IntensityCalculator.getDaysSinceYearStart(dt[0]);
        this.hoursSinceDayStart = IntensityCalculator.getHoursSinceDayStart(dt[1]);
        this.latitude = latitude; //deg
        this.longitude = longitude; //deg
        this.altitude = altitude; //meters above sea level
    }

    static degToRad(deg)
    {
        let rad = (deg * Math.PI) / 180;
        return rad;
    }

    static radToDeg(rad)
    {
        let deg = rad * (180 / Math.PI)
        return deg;
    }

    static getJulianDate(date) 
    {
        date = new Date(date);
        let unix = date.getTime();
        let timezone = 10 * 60; //UTC+10 is cape york timezone
        let julian = Math.floor((unix / 86400000) - (timezone / 1440) + 2440587.5);
        return julian;
    }

    static getJ2000(date)
    {
        let julian = IntensityCalculator.getJulianDate(date);
        return julian - 2451545;
    }

    static getDaysSinceYearStart(date)
    {
        let dateObj = new Date();
        let startOfYear = new Date(dateObj.getFullYear(), 0, 1);
        date = new Date(date);
        let unixDifference = date.getTime() - startOfYear.getTime();
        return Math.round(unixDifference / (86400000)) + 1;
    }

    static getHoursSinceDayStart(localTime)
    {
        let hms = localTime.split(":");
        return (parseInt(hms[0])) + parseInt(hms[1] / 60) + (parseInt(hms[2]) / (3600));
    }

    setDatetime(dateTimeStr)
    {
        let dt = dateTimeStr.split(" ");
        this.date = new Date(dateTimeStr);
        this.J2000 = IntensityCalculator.getJ2000(dateTimeStr);
        this.daysSinceYearStart = IntensityCalculator.getDaysSinceYearStart(dt[0]);
        this.hoursSinceDayStart = IntensityCalculator.getHoursSinceDayStart(dt[1]);
    }

    setLatitude(latitude)
    {
        this.latitude = latitude;
    }

    setLongitude(longitude)
    {
        this.longitude = longitude;
    }

    setAltitude(altitude)
    {
        this.altitude = altitude;
    }

    getDeclination()
    {
        let meanLongitude = this.J2000 * 0.01720279239 + 4.894967873;
        let meanAnomaly = this.J2000 * 0.01720197034 + 6.240040768;
        let obliquity = 0.4090877234 - 0.000000006981317008 * this.J2000;

        let eclipticLongitude = meanLongitude + 0.03342305518 * Math.sin(meanAnomaly) + 0.0003490658504 * Math.sin(2 * meanAnomaly);
        
        let rDeclination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLongitude));
        let declination = IntensityCalculator.radToDeg(rDeclination);
        return declination;
    }

    getRightAscension()
    {
        let obliquity = 0.4090877234 - 0.000000006981317008 * this.J2000;
        let meanLongitude = this.J2000 * 0.01720279239 + 4.894967873;
        let meanAnomaly = this.J2000 * 0.01720197034 + 6.240040768;
        let eclipticLongitude = meanLongitude + 0.03342305518 * Math.sin(meanAnomaly) + 0.0003490658504 * Math.sin(2 * meanAnomaly);

        let rightAscension = Math.atan2(Math.cos(obliquity) * Math.sin(eclipticLongitude), Math.cos(eclipticLongitude));
        return rightAscension;
    }

    getSiderealTime()
    {
        let d = this.J2000;
        let rLongitude = IntensityCalculator.degToRad(this.longitude);
        return 4.894961213 + 6.300388099 * d + rLongitude;
    }

    getHourAngleEstimate()
    {
        return (this.hoursSinceDayStart - 12) * 15;
    }

    getHourAngle()
    {
        let timezone = 10;
        let LSTM = 15 * timezone;
        console.log("LSTM", LSTM);

        let B = (360/365) * (this.daysSinceYearStart - 81);
        let equation = [9.87 * Math.sin(2*B), -7.53 * Math.cos(B), -1.5 * Math.sin(B)];
        let EoT = equation[0] + equation[1] + equation[2];
        console.log("EoT", EoT);

        let TC = 4 * (this.longitude - LSTM) + EoT;
        let LST = this.hoursSinceDayStart + (TC / 60);

        let HRA = 15 * (LST - 12);
        return HRA;
    }

    getElevation()
    {
        let declination = IntensityCalculator.degToRad(this.getDeclination());
        let rLatitude = IntensityCalculator.degToRad(this.latitude);
        let hourAngle = IntensityCalculator.degToRad(this.getHourAngleEstimate());

        let sinElevation = Math.sin(declination) * Math.sin(rLatitude) + Math.cos(declination) * Math.cos(rLatitude) * Math.cos(hourAngle);
        let elevation = Math.asin(sinElevation);

        return IntensityCalculator.radToDeg(elevation);
    }

    getZenith()
    {
        return 90 - this.getElevation();
    }

    getAzimuth()
    {
        let declination = IntensityCalculator.degToRad(this.getDeclination());
        let zenith = IntensityCalculator.degToRad(this.getZenith());
        let hourAngle = IntensityCalculator.degToRad(this.getHourAngleEstimate());

        let numerator = -Math.sin(hourAngle) * Math.cos(declination);
        let denominator = Math.sin(zenith);

        let azimuth = IntensityCalculator.radToDeg(numerator / denominator);
        
        if(this.getHourAngleEstimate() > 0)
        {
            return 360 - Math.abs(azimuth);
        }
        else
        {
            return azimuth;
        }
    }

    getAirMass()
    {
        let z = this.getZenith();
        let earthCurve = 0.50572 * (96.07995 - z);
        let denominator = Math.cos(z) + Math.pow(earthCurve, -1.6364);
        
        return Math.abs(1 / denominator);
    }

    getDirectIntensity()
    {
        let airmass = this.getAirMass();
        let temp = Math.pow(airmass, 0.678);
        let airmassMultiplier = Math.pow(0.7, temp);

        let a = 0.14;
        let hKm = this.altitude / 1000;

        let intensity = 1.353 * ( (1 - a*hKm) * airmassMultiplier + a*hKm);
        return intensity;
    }

    getGlobalIntensity()
    {
        return 1.1 * this.getDirectIntensity();
    }
}