
import axios from 'axios';

const API_KEY = '311d9973';

export const searchMovies = (searchParmeter, yearParameter) => {
    return axios.get(`http://www.omdbapi.com/?s=${searchParmeter}&y=${yearParameter}&apikey=${API_KEY}`)
        .then(response => {
            return response
        }).catch(e => {

        })
}

export const getMovie = (imdbID) => {
    return axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(response => {
            return response
        }).catch(e => {

        })
}


export const CLICK_UPDATE_VALUE = 'CLICK_UPDATE_VALUE';
export const clickButton = (title, year) => ({
    type: CLICK_UPDATE_VALUE,
    newValue: title,
    newYear: year
});