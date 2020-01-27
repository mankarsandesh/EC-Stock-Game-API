const express = require('express');
const app = express();
const cors = require('cors');



const bodyParser = require('body-parser');



const port = process.env.PORT || 1001;
app.use(bodyParser.json());

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