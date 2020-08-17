"use strict";
module.exports = function (app) {
    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    });
    app.get('/', function (req, res, next) {
        res.render('index.njk');
    });
};
