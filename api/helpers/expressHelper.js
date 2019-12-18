var settings = require('../config/settings');
var Logger = require('../config/logger');
var MainHelper = require('./mainHelper');

module.exports = function () {
    return {
        createLogger: function (req, res, next) {
            req.logger = new Logger(settings);
            next();
        }
    };
};