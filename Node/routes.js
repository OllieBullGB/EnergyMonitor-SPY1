const url = require('url');

module.exports = function(app)
{
    
    app.all('/api/solar', function(req, res)
    {
        console.table(req.body);
        res.status(200).json({message: "server active"});
    })

    app.all('/', function(req, res)
    {
        res.status(200).json({message: "server active"});
    })
}