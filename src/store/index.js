
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import { Reducers } from '../reducers';
export const Store = createStore(
        Reducers,
        compose(
            applyMiddleware(thunk, api, createLogger())
        )
    );