
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


export const Options = [
  { value: 'TITLE_INCREASING', label: 'Title increasing' },
  { value: 'TITLE_DECREASING', label: 'Title decreasing' },
  { value: 'RATING_INCREASING', label: 'Rating increasing' },
  { value: 'RATING_DECREASING', label: 'Rating decreasing' }
];

export const sortMovies = (type, list) => {
    console.log(type);
    switch(type){
        case Options[0].value: 
            list.Search.sort((a, b) => {
                return a.Title > b.Title ? 1 : -1;
            });
            break;
        case Options[1].value: 
            list.Search.sort((a, b) => {
                return a.Title > b.Title ? -1 : 1;
            });
            break;        
        case Options[2].value: 
            list.Search.sort((a, b) => {
                return a.imdbRating > b.imdbRating ? 1 : -1;
            });
            break;
        case Options[3].value: 
            list.Search.sort((a, b) => {
                return a.imdbRating > b.imdbRating ? -1 : 1;
            });
            break;
        default:
            return list;
    }
    return list;
};