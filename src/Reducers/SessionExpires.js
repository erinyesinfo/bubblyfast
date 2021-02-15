import { getSessionExpires } from '../Actions/types.js';

const INIALSTATE = "";

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getSessionExpires:
            return action.payload;
        default:
            return state;
    }
};