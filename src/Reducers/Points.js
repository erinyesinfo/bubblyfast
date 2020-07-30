import { getPoints } from '../Actions/types.js';

const INIALSTATE = 0;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPoints:
            return action.payload;
        default:
            return state;
    }
};