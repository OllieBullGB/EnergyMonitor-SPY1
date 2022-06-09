module.exports = function(app) {
    //Dependencies
    const OpenWeather = require('./models/OpenWeather');
    const HandyStorage = require('handy-storage');
    const store = new HandyStorage('./store.json');
    
    app.all('/api/solar', (req, res) => {
    	console.info("Request received");
        console.table(req.body);
        //Make weather object
        let weather = new OpenWeather(req.body.lat,req.body.lon,
                                      "",store);       
        res.status(200).json(req.body);
    });

    app.all('/api/', (req, res) => {
        res.status(200).json({message: "server active"});
    });
}
