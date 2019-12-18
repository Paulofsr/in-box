var logger = require('../config/logger')();
var omdbAPI = require('../helpers/omdbapi')();

module.exports = function () {
    return {
        getMovies: (title, year) => {
            logger.info('[business-documentBO] Getting documents from database');
            return new Promise(function (resolve, reject) {
                omdbAPI.movies(title, year)
                    .then(movies => {
                        if (movies.Search && movies.Search.length > 0) {
                            const update = movies.Search.map((item) => {
                                return omdbAPI.movie(item.imdbID)
                                    .then(movie => {
                                        item["imdbRating"] = movie.imdbRating;
                                    });
                            })
                            Promise.all(update).then(() => {
                                resolve(movies);
                            })
                        } else
                            reject(movies);
                    })
            })
        },
        getMovie: (imdbID) => {
            return new Promise(function (resolve, reject) {
                omdbAPI.movie(imdbID)
                    .then(movie => {
                        if (movie.Title)
                            resolve(movie);
                        else
                            reject(movie);
                    })
            })
        }
    };
};