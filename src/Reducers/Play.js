import { getTheGame } from '../Actions/types.js';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getTheGame:
            return action.payload;
        default:
            return state;
    }
};