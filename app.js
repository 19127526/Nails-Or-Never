const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const routes = require('./routes/v1/index');
const db = require('./configs/mysql');

/*
const redisClient = require('./configs/redis');
redisClient.connect().then(function () {
    console.log('Redis connection is OK!');
}).catch(function (err) {
    console.log(err);
    process.exit(1);
})
*/


db.raw('select 1+1 as result').then(function () {
    console.log('Database connection is OK!');
}).catch(function (err) {
    console.log(err);
    process.exit(1);
})





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
var cors = require('cors')
app.use(cors({
    origin: ["http://82.180.162.210:3000", "http://82.180.162.210:3001", "https://admin.nailsornever.com", "https://nailsornever.com", "http://nailsornever.com:3000", "http://nailsornever.com"]
}))

app.use('/api/v1', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({"error": err.message});
});

module.exports = app;