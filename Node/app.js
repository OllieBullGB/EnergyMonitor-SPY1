//Dependencies
const IntensityCalculator = require('./models/IntensityCalculator');
const SolarArrayModel = require('./models/SolarArrayModel');
const WeatherAtTime = require('./models/WeatherAtTime');
const OpenWeather = require('./models/OpenWeather');


//create an express web server
const fetch = require('node-fetch');
const HandyStorage = require('handy-storage');
const store = new HandyStorage('./store.json');
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
app.use(express.static('public',{extensions:['html']}))

// Use json to parse request bodies
app.use(express.json());

//Add API routes
const routes = require('./routes');
routes(app);

module.exports = app;
