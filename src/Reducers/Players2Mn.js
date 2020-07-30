import { getPlayers2Mn } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPlayers2Mn:
            return action.payload;
        default:
            return state;
    }
};