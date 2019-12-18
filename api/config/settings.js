
var util = require('util');

module.exports = {
    servicePort: process.env.PORT || 8000,
    inTest: process.env.IN_TEST || false,
    logging: {
        consoleLevel: process.env.LOGGING_CONSOLE_LEVEL || 'debug',
        fileLevel: process.env.LOGGING_FILE_LEVEL || 'debug',
        dbLebel: process.env.LOGGING_DB_LEVEL || 'debug',
        useDB: process.env.LOGGING_USE_DB === 'true',
        saveRequests: process.env.LOGGING_SAVE_REQUESTS === 'false'
    },
    omdbapiURL: process.env.OMDBAPI_URL || 'http://www.omdbapi.com/',
    API_KEY: process.env.OMDBAPI_API_KEY || '311d9973'
};