/**
 * 
 *  Filename: server.js
 * 
 *  Date: 6th June 2022
 * 
 *  Description: A file to create an instance of app.js
 *               and start running EnergyMonitor
 * 
 *  Version: v1.0 06/06/22,
 * 
 */

const app = require('./app');
const port = 25565;

//Listen for page requests on specified port
app.listen(port, () => 
{
    console.info(`Server listening on port ${port}`);
});
