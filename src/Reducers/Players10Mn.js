import { getPlayers10Mn } from '../Actions/types.js';

const INIALSTATE = [];

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPlayers10Mn:
            return action.payload;
        default:
            return state;
    }
};