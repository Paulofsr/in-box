
import axios from 'axios';

export const searchMovies = (searchParmeter, yearParameter) => {
    return axios.get(`http://www.omdbapi.com/?s=${searchParmeter}&y=${yearParameter}&apikey=311d9973`)
        .then(response => {
            return response
        }).catch(e => {

        })
}

export const getMovie = (imdbID) => {
    return axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=311d9973`)
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