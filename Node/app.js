const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator');
//Import routers
const siteRoutes = require('./routes/site');

//create an express web server on Localhost:3000
const app = express();

//Forcing the app to use a package which protects from well known
//web vulnerabilities by setting appropriate HTTP headers
app.use(helmet());

//Forces the app to remove any express branding to help prevent
//targeted attacks to the webserver
app.disable('x-powered-by');

//give express static access to the folders used to store the webpages aswell as
//associated CSS, client side JS and images
app.use(express.static('public'));
app.use('/css', express.static('/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));

//When a non-post request is recieved by the server, process it as a GET request
//Using pre-determined routes
app.get('/', (req, res, next) => {
    res.status(200);
    res.render('index', {
        title: 'Homepage',
        css: 'index'
    });
});
app.use('/site', siteRoutes);

module.exports = app;