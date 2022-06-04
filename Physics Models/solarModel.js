//calculates Local Standard Time Meridian
function calculateLSTM()
{
    const capeYorkTimezone = 10; //UTC + 10;
    return 15 * capeYorkTimezone;
}

//estimation for the eccentricity of the earths orbit and axial tilt
function calculateEoT(daysSinceYearStart)
{
    const B = (360/365) * (daysSinceYearStart - 81);
    return (9.87 * Math.sin(2 * B)) - (7.53 * Math.cos(B)) - (1.5 * Math.sin(B));
}

//The net Time Correction Factor (in minutes) accounts for the variation of the 
//Local Solar Time (LST) within a given time zone due to the longitude variations
//within the time zone
function calculateTimeCorrectionFactor(longitude, EoT)
{
    const LSTM = calculateLSTM();
    return 4 * (longitude - LSTM) + EoT;
}

//The Local Solar Time (LST) is calculated by applying corrections to
//the local time (LT).
function calculateLST(localTimeInHours, timeCorrectionFactor)
{
    return localTimeInHours + (timeCorrectionFactor / 60);
}

//The Hour Angle converts the local solar time (LST) into the number of
//degrees which the sun moves across the sky
function calculateHRA(localSolarTime)
{
    return 15 * (localSolarTime - 12);
}

function singleCalculateHRA(daysSinceYearStart, longitude, localTimeInHours)
{
    const EoT = calculateEoT(daysSinceYearStart);
    const timeCorrectionFactor = calculateTimeCorrectionFactor(longitude, EoT);
    const LST = calculateLST(localTimeInHours, timeCorrectionFactor);
    return calculateHRA(LST);
}

function calculateDeclinationAngle(daysSinceYearStart)
{
    return -23.45 * Math.cos((360/365) * (daysSinceYearStart + 10));
};

/*
function calculateAzimuthAngle(elevation, latitude, declination, hourAngle)
{
    if(hourAngle > 0)
    {
        return 360 - Math.acos( ( (Math.sin(declination) * Math.cos(latitude)) - (Math.cos(declination) * Math.sin(latitude) * Math.cos(hourAngle)) ) / Math.cos(elevation) );
    }
    else
    {
        return Math.acos( ( (Math.sin(declination) * Math.cos(latitude)) - (Math.cos(declination) * Math.sin(latitude) * Math.cos(hourAngle)) ) / Math.cos(elevation) );
    }
}
*/

function calculateElevationAngle(latitude, declinationAngle, HRA)
{
    let result = Math.asin(Math.sin(declinationAngle) * Math.sin(latitude) + Math.cos(declinationAngle) * Math.cos(latitude) * Math.cos(HRA));
    if(result > 90)
    {
        result = result - 180;
    }
    return result;
}

function calculateZenithAngle(latitude, declinationAngle, HRA)
{
    let elevationAngle = calculateElevationAngle(latitude, declinationAngle, HRA);
    return elevationAngle;
}

function calculateAirMass(angleFromZenith)
{
    return  1 / (Math.cos(angleFromZenith) + 0.50572 * Math.pow((96.07995 - angleFromZenith), -1.6364));
}

function calculateSunlightIntensity(airMass, elevation)
{
    const solarConstant = 1.353;
    const atmosphericConformity = 0.678;
    const heightRateOfIncrease = 0.14;
    let intensity = solarConstant * ( (1 - (heightRateOfIncrease * elevation)) * Math.pow(0.7, Math.pow(airMass, atmosphericConformity)) + heightRateOfIncrease * elevation);
    return intensity;
}

function calculateGlobalIrradiance(date, elevation, latitude, longitude, localTime)
{
    let daysSinceYearStart = getDaysSinceYearStart(date);
    let declinationAngle = calculateDeclinationAngle(daysSinceYearStart);
    let HRA = singleCalculateHRA(daysSinceYearStart, longitude, getHoursSinceDayStart(localTime));
    let airMass = calculateAirMass(HRA, elevation);
    let sunlightIntensity = calculateSunlightIntensity(airMass, elevation);
    return sunlightIntensity * 1.1;
}

//requires US Date Format
function getDaysSinceYearStart(date)
{
    let dateObj = new Date();
    let startOfYear = new Date(dateObj.getFullYear(), 0, 1);
    date = new Date(date);
    let unixDifference = date.getTime() - startOfYear.getTime();
    return Math.round(unixDifference / (86400000)) + 1;
}

function getHoursSinceDayStart(localTime)
{
    let hms = localTime.split(":");
    return (parseInt(hms[0])) + parseInt(hms[1] / 60) + (parseInt(hms[2]) / (3600));
}

/*
function calculateSolarSunrise(date, latitude)
{
    let daysSinceYearStart = getDaysSinceYearStart(date);
    let declination = declinationAngle(daysSinceYearStart);
    let sunrise = 12 - (1/15) * (Math.acos((-Math.sin(latitude) * Math.sin(declination)) / (Math.cos(latitude) * Math.cos(declination))));
    return sunrise;
}

function calculateSolarSunset(date, latitude)
{
    let daysSinceYearStart = getDaysSinceYearStart(date);
    let declination = declinationAngle(daysSinceYearStart);
    let sunset = 12 + (1/15) * (Math.acos((-Math.sin(latitude) * Math.sin(declination)) / (Math.cos(latitude) * Math.cos(declination))));
    return sunset
}
*/



let daysSinceYearStart = getDaysSinceYearStart("06-21-2022");
console.log("DSYS" , daysSinceYearStart);

let declinationAngle = calculateDeclinationAngle(daysSinceYearStart);
console.log("DA", declinationAngle);

let hoursSinceDayStart = getHoursSinceDayStart("12:00:00");

let HRA = singleCalculateHRA(daysSinceYearStart, 142.5316, hoursSinceDayStart);
console.log("HRA", HRA);


let elevationAngle = calculateElevationAngle(10.6891, declinationAngle, HRA);
console.log("EA", elevationAngle);

let zenithAngle = calculateZenithAngle(10.6891, declinationAngle, HRA)
console.log("ZA", zenithAngle);

let airMass = calculateAirMass(zenithAngle, 1011);
console.log("AM", airMass);

let sunlightIntensity = calculateSunlightIntensity(airMass, 1011);
console.log("SI", sunlightIntensity);
