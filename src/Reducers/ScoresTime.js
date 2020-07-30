import { getScoresTime } from '../Actions/types.js';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getScoresTime:
            return action.payload;
        default:
            return state;
    }
};