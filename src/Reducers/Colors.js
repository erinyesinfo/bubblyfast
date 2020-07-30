import { getColors } from '../Actions/types.js';
import { v4 as uuid } from 'uuid';

const Colors = Array.from({ length: 20 }).fill().map((x)=> {
    let randomBalls = [ "twoBalls", "threeBalls", "fourBalls", "fiveBalls" ];
    let colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
    let randomColors = colors[Math.floor(Math.random() * colors.length)];
    let style = { background: randomColors };
    return ({
        id: uuid(),
        randomBalls: randomBalls[Math.floor(Math.random() * randomBalls.length)],
        randomColors,
        style
    })
});

const find = Colors.map(color =>
    color.randomBalls === "twoBalls" ? 2
    :color.randomBalls === "threeBalls" ? 3
    :color.randomBalls === "fourBalls" ? 4
    :5
);
// duplicate colors based on names(randomBalls)
const bubbleColor = find.map(f => {
    let colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
    let randomColors = colors[Math.floor(Math.random() * colors.length)];
    return Array.from({ length: f }).fill().map((x)=> {
        let style = { background: randomColors };
        return ({
            id: uuid(),
            randomBalls: (f === 2 ? "twoBalls": f === 3 ? "threeBalls":f === 4 ? "fourBalls":"fiveBalls"),
            randomColors,
            style
        })
    });
});

let INIALSTATE = [];
bubbleColor.map(b => INIALSTATE.push(...b));

export default (state = INIALSTATE, action) => {
    switch (action.type) {
        case getColors:
            return action.payload;
        default:
            return state;
    }
};