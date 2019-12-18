var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var settings = require('./settings');
var ExpressHelper = require('../helpers/expressHelper');

module.exports = function () {
    var app = express();
    var expressHelper = new ExpressHelper();

    app.set('port', settings.servicePort);

    app.use(bodyParser.urlencoded({
        limit: '1mb',
        extended: true
    }));
    app.use(bodyParser.json({
        limit: '1mb'
    }));
    app.use(methodOverride());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(expressHelper.createLogger);

    load('controllers', {
            cwd: 'api'
        })
        .then('routes')
        .into(app);

    return app;
};