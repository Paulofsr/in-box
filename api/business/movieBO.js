var logger = require('../config/logger')();
var omdbAPI = require('../helpers/omdbapi')();

module.exports = function () {
    return {
        getMovies: (title, year) => {
            logger.info('[business-documentBO] Getting movies from OMDB');
            return new Promise(function (resolve, reject) {
                if(title){
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
                                    logger.info('[business-documentBO] Success get all movies.');
                                    resolve(movies);
                                })
                            } else
                                reject(movies);
                        })
                } else {
                    reject({"Error": "Title is required."});
                }
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