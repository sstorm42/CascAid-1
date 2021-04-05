const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
const routes = require('./routes');
const cors = require('cors');
// const morgan = require('morgan');
const fs = require('fs');

mongoose.Promise = global.Promise;
if (mongoose.connection.readyState == 0) {
    mongoose.connect(config.DATABASE, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected');
    mongoose.set('useFindAndModify', false);
}
// const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' });
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
// app.use(morgan('combined', { stream: accessLogStream }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/uploaded-images', express.static('uploaded_images'));
app.use('/default-images', express.static('default_images'));

//connect all routes to the application
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    console.log('BUILD');
    res.cookie().sendFile(path.join(__dirname, 'build', 'index.html'));
});
module.exports = app;
