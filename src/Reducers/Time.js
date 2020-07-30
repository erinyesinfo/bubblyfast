import { getGameTime } from '../Actions/types.js';

const INIALSTATE = false;

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getGameTime:
            return action.payload;
        default:
            return state;
    }
};