
import { clickReducer } from './clickReducer';
import { searchMovies, getMovie } from '../actions'
import { combineReducers } from 'redux';
export const Reducers = combineReducers({
  clickState: clickReducer,
  movies: searchMovies,
  movie: getMovie
});