import { CLICK_UPDATE_VALUE } from '../actions';

const initialState = {
    newValue: '',
    newYear: ''
};

export const clickReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICK_UPDATE_VALUE:
            return Object.assign({}, state, {
                newValue: action.newValue,
                newYear: action.newYear ? action.newYear : ''
            })
        default:
            return state;
    }
};