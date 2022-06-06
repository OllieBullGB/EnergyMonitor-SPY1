const app = require('./app');
const port = 3000;

//Listen for page requests on port 3000
app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});