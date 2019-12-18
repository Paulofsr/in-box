var logger = require('../../config/logger')();
var movieBO = require('../../business/movieBO')();

module.exports = function () {
    return {
        getMovies: function (req, res) {
            logger.info('[controllers-movie] GetAll Movies.');
            movieBO.getMovies(req.query.title, req.query.year)
                .then(
                    movies => {
                        res.status(200).json(movies);
                    },
                    error => {
                        res.status(400).json(error);
                    });
        },

        getMovie: function (req, res) {
            logger.info('[controllers-movie] Get specific movie.');
            movieBO.getMovie(req.params.imdbID)
                .then(
                    movie => {
                        res.status(200).json(movie);
                    }, 
                    error => {
                        res.status(400).json(error);
                    }
                );
        }
    };

};