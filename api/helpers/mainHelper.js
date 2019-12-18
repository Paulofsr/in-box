var DateHelper = require('./dateHelper');
var HashHelper = require('./hashHelper');

module.exports = {
    getHelper: function (helper, logger) {
        switch (helper) {
            case 'hash':
                return HashHelper;
            case 'date':
                return new DateHelper(logger);
        }
    }
};