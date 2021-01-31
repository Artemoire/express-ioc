/**
 * @type {movies_domain.Movie[]}
 */
const MOVIES = [
    {
        title: "Star Wars Episode III: Revenge of the Sith",
        duration: 60 * 60 * 1000 * 3,
        rank: 1
    },
    {
        title: "Star Wars Episode IX: Rise of Skywalker",
        duration: 60 * 60 * 1000 * 2.3,
        rank: 1000000
    }
];

class MoviesEndpoint {

    async getMovies() {
        return MOVIES;
    }

}

module.exports = {
    type: MoviesEndpoint,
    resolve: (resolver) => new MoviesEndpoint()
}