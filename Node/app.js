/**
 * 
 *  Filename: app.js
 * 
 *  Date: 6th June 2022
 * 
 *  Description: An instance of the EnergyMonitor application
 * 
 *  Version: v1.0 06/06/22, v1.1 08/06/22, v1.2 09/06/22
 * 
 */

//Dependencies
const IntensityCalculator = require('./models/IntensityCalculator');
const SolarArrayModel = require('./models/SolarArrayModel');

//create an express web serverW
const fetch = require('node-fetch');
const express = require('express');
const app = express();
app.set('view engine', 'html')

//Forcing the app to use a package which protects from well known
//web vulnerabilities by setting appropriate HTTP headers
const helmet = require('helmet');
app.use(helmet());

//Forces the app to remove any express branding to help prevent
//targeted attacks to the webserver
app.disable('x-powered-by');

//give express static access to public folder
//Requests without extensions will be treated as ".html"
app.use(express.static('public',{extensions:['html']}));

//Use json to parse request bodies
app.use(express.json());

//Add API routes
const routes = require('./routes');
routes(app);

module.exports = app;

i = new IntensityCalculator("06/12/22, 12:00:00", 0, 0, 0);
s = new SolarArrayModel(i, 1, 0, 0, 0, 273);
console.log(s.getPower());