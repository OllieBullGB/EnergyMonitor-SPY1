const express = require('express');
const helmet = require('helmet');

//create an express web server
const app = express();
app.set('view engine', 'html')

//Forcing the app to use a package which protects from well known
//web vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

//Forces the app to remove any express branding to help prevent
//targeted attacks to the webserver
app.disable('x-powered-by');

//give express static access to public folder
app.use(express.static('public'));

module.exports = app;
