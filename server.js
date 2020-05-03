// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express, CORS and Body Parser
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configure the server port and cross origin allowance
const port = 3000;
const constOptions = {
    origin: '*',
    optionSuccessStatus: 200
};

// Start up an instance of app
const app = express();

/* Middleware*/
// Configure body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
