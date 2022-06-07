const app = require('./app');
const port = 25565;

//Listen for page requests on specified port
app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});
