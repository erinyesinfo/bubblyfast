import { getNextColor } from '../Actions/types.js';

const INIALSTATE = { color: '' };

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getNextColor:
            return action.payload;
        default:
            return state;
    }
};