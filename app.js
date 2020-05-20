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

// bring in routes
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const tagRoutes = require('./routes/tag');

app.use(morgan('dev'));
app.use(bodyParser.json({limit: "50MB"}));
app.use(cookieParser())

app.use("/api", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", tagRoutes);

const port = process.env.PORT || 3005;
app.listen(port, () => {console.log(`A node js api is listening on port: ${port}`)});