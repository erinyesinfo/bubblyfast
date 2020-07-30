import { combineReducers } from 'redux';

import Play from './Play';
import Scores from './Scores';
import Time from './Time';
import ScoresTime from './ScoresTime';
import Colors from './Colors';
import NextColor from './NextColor';
import PlayerID from './PlayerID';
import Points from './Points';
import Username from './Username';
import Players30Sec from './Players30Sec';
import Players2Mn from './Players2Mn';
import Players10Mn from './Players10Mn';

export default combineReducers({
    Play,
    Scores,
    Time,
    ScoresTime,
    Colors,
    NextColor,
    PlayerID,
    Points,
    Username,
    Players30Sec,
    Players2Mn,
    Players10Mn,
});