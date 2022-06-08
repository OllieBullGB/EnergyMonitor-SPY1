module.exports = function(app) {
    app.all('/api/solar', (req, res) => {
    	console.info("Requested received");
        console.table(req.body);
        res.set("Content-Security-Policy", "default-src 'self';connect-src 'self';");
        res.status(200).json(req.body);
    });

    app.all('/api/', (req, res) => {
        res.status(200).json({message: "server active"});
    });
}
