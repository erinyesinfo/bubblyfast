import { getNextColor } from '../Actions/types.js';

const INIALSTATE = "";

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNextColor:
            return action.payload;
        default:
            return state;
    }
};