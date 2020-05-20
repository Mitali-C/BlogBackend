const express = require('express');
const app =  express();
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();
app.use(cors());
// db 
mongoose.connect(process.env.MONGO_URI,   { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
    console.log('DB Connected')
});

mongoose.connection.on('error' , err => {
    console.log(`DB Connection Error: ${err.message}`);
} )

const port = process.env.PORT || 3005;