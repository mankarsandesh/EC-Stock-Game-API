const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer();

// Load all environment variables
require('dotenv').config();

// Connect DB
require('./app/db/db');

// Routers
const currencyRouter = require('./app/router/currency');
const ruleRouter = require('./app/router/rule');
const announcementRouter = require('./app/router/announcement');
const userRouter = require('./app/router/user');
const stockRouter = require('./app/router/stock');
const bettingRouter = require('./app/router/betting');

const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
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

// Routers
app.use(currencyRouter);
app.use(ruleRouter);
app.use(announcementRouter);
app.use(userRouter);
app.use(stockRouter);
app.use(bettingRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app