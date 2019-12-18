module.exports = function (app) {
    var controller = app.controllers.movie;

    app.route('/v1/movies')
        .get(controller.getMovies);
    
    app.route('/v1/movies/:imdbID')
        .get(controller.getMovie);
}