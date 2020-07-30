import { getPlayerID } from '../Actions/types.js';

const INIALSTATE = '';

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getPlayerID:
            return action.payload;
        default:
            return state;
    }
};