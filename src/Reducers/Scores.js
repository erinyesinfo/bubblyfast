import { getScores } from '../Actions/types.js';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getScores:
            return action.payload;
        default:
            return state;
    }
};