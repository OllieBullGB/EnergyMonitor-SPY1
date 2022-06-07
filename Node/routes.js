module.exports = function(app) {
    app.all('/api/solar', (req, res) => {
    	console.info("Requested received");
        console.table(req.body);
        res.status(200).json({message: "server active"});
    });

    app.all('/api/', (req, res) => {
        res.status(200).json({message: "server active"});
    });
}
