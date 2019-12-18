var settings  = require('../config/settings');
var axios     = require('axios');

module.exports = function() {
    return {
        movies: function (title, year) {
            return new Promise(function (resolve, reject){
                axios.get(`${settings.omdbapiURL}?s=${title}&y=${year}&apikey=${settings.API_KEY}`)
                    .then(response => {
                        if (response.status == 200) {
                            resolve(response.data);
                        }
                        reject({
                            "messagem": "Invalid search."
                        });
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
            })
        },
        movie: function (imdbID) {
            return new Promise(function (resolve, reject) {
                axios.get(`${settings.omdbapiURL}?i=${imdbID}&apikey=${settings.API_KEY}`)
                    .then(response => {
                        if (response.status == 200) {
                            resolve(response.data);
                        }
                        reject({
                            "messagem": "Invalid id."
                        });
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
            })
        }
    }
}