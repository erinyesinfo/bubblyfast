import { getPlayers30Sec } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPlayers30Sec:
            return action.payload;
        default:
            return state;
    }
};