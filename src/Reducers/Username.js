import { getUsername } from '../Actions/types.js';

const INIALSTATE = "Unknown";

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getUsername:
            return action.payload;
        default:
            return state;
    }
};