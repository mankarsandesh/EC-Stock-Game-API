const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer();

// Load all environment variables
require('dotenv').config();

// Connect DB
require('./app/db/db');

const bodyParser = require('body-parser');

const port = process.env.PORT || 5010;

app.use(bodyParser.json());
app.use(upload.array());

//CORS configuration
const corsOptions = {
    origin: '*',
    //Expose the token on the client side in the response
    exposedHeaders: ['token'],
    withCredentials: true
};

//CORS middleware
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app