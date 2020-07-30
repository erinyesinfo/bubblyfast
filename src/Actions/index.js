import { v4 as uuid } from 'uuid';// uuid is library that generate random id's
import { getTheGame, getScores, getGameTime, getScoresTime, getColors, getNextColor, getPlayerID, getPoints, getUsername, getPlayers30Sec, getPlayers2Mn, getPlayers10Mn } from './types';

export const handlePlayGame = playDefault => dispatch => {
    if (playDefault === true) {
        return dispatch({ type: getTheGame, payload: false });
    }
    const data = true;
    return dispatch({ type: getTheGame, payload: data });
};

export const handleShowScores = scoresDefault => dispatch => {
    if (scoresDefault === true) {
        return dispatch({ type: getScores, payload: false });
    }
    const data = true;
    return dispatch({ type: getScores, payload: data });
};

export const handleGameTime = time => dispatch => {
    if (time === true) {
        return dispatch({ type: getGameTime, payload: false });
    }
    const data = time;
    return dispatch({ type: getGameTime, payload: data });
};

export const handleScoresTime = time => dispatch => {
    if (time === true) {
        return dispatch({ type: getScoresTime, payload: false });
    }
    const data = time;
    return dispatch({ type: getScoresTime, payload: data });
};

export const handleAddOneColor = (color, i) => (dispatch, getState) => {    
    const oneColor = Array.from({ length: 1 }).fill().map((x)=> {
        const style = { background: color };
        return ({
            id: JSON.parse(window.localStorage.getItem("8052e6b9-48e6-4082-ad7c-38a14b9ee9d5") || uuid()),
            randomBalls: "oneBall",
            randomColors: color,
            style
        })
    });
    // Other than splice, you can use this approach which will not mutate the original array, but will create a new array with the added item. You should usually avoid mutation whenever possible. I'm using ES6 spread operator here.
    const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
    ];
    const data = insert(getState().Colors, i, ...oneColor);

    return dispatch({ type: getColors, payload: data });
};

export const playAgainWithDifferentColor = () => dispatch => {
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
    
    let data = [];
    bubbleColor.map(b => data.push(...b));
    return dispatch({ type: getColors, payload: data });
};

export const handleNextColor = () => (dispatch, getState) => {
    let nextColors = getState().Colors[Math.floor(Math.random() * getState().Colors.length)].randomColors;
    const style = { background: nextColors };
    const generateId = uuid();
    window.localStorage.setItem("8052e6b9-48e6-4082-ad7c-38a14b9ee9d5", JSON.stringify(generateId))
    const data = {
        id: generateId,
        randomBalls: "oneBall",
        randomColors: nextColors,
        style
    };    
    return dispatch({ type: getNextColor, payload: data });
};

export const colorsToBeAdded = colors => (dispatch, getState) => {
    let two = 0, three = 0, four = 0, five = 0;
    const colorsData = colors.map(color => {
        if (color === "twoBalls") {
            two = two + 1;
            if (two === 2) {
                two = 0;
                const colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
                let randomColors = colors[Math.floor(Math.random() * colors.length)];
                return Array.from({ length: 2 }).fill().map((x)=> {
                    const style = { background: randomColors };
                    return ({
                        id: uuid(),
                        randomBalls: "twoBalls",
                        randomColors,
                        style,
                    })
                });
            }
        } else if (color === "threeBalls") {
            three = three + 1;
            if (three === 3) {
                three = 0;
                const colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
                let randomColors = colors[Math.floor(Math.random() * colors.length)];
                return Array.from({ length: 3 }).fill().map((x)=> {
                    const style = { background: randomColors };
                    return ({
                        id: uuid(),
                        randomBalls: "threeBalls",
                        randomColors,
                        style
                    })
                });
            }
        } else if (color === "fourBalls") {
            four = four + 1;
            if (four === 4) {
                four = 0;
                const colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
                let randomColors = colors[Math.floor(Math.random() * colors.length)];
                return Array.from({ length: 4 }).fill().map((x)=> {
                    const style = { background: randomColors };
                    return ({
                        id: uuid(),
                        randomBalls: "fourBalls",
                        randomColors,
                        style
                    });
                });
            }
        } else if (color === "fiveBalls") {
            five = five + 1;
            if (five === 5) {
                five = 0;
                const colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
                let randomColors = colors[Math.floor(Math.random() * colors.length)];
                return Array.from({ length: 5 }).fill().map((x)=> {
                    const style = { background: randomColors };
                    return ({
                        id: uuid(),
                        randomBalls: "fiveBalls",
                        randomColors,
                        style
                    })
                });
            }
        } return null
    });
    const filterData = colorsData.filter(color => color !== null && color !== undefined);
    const data = [...getState().Colors].concat(...filterData);
    return dispatch({ type: getColors, payload: data });
};

export const colorsToBeRemoved = (color, isTrue) => (dispatch, getState) => {
    if (isTrue === true) {        
        const data = [...getState().Colors].filter(i => i.id !== color);
        return dispatch({ type: getColors, payload: data });
    }
    const data = [...getState().Colors].filter(i => i.id !== color.id);

    return dispatch({ type: getColors, payload: data });
};

export const handleUpdatePlayerId = id => dispatch => {
    dispatch({ type: getPlayerID, payload: id });
};

export const points = (defaultPoints) => (dispatch, getState) => {
    if (defaultPoints === true) {
        return dispatch({ type: getPoints, payload: 0 });
    }
    const data = getState().Points + 10;
    return dispatch({ type: getPoints, payload: data });
};

export const handleUsername = username => dispatch => {
    dispatch({ type: getUsername, payload: username });
};

export const handlePlayers30Sec = players => dispatch => {
    return dispatch({ type: getPlayers30Sec, payload: players });
};

export const handlePlayers2Mn = players => dispatch => {
    return dispatch({ type: getPlayers2Mn, payload: players });
};

export const handlePlayers10Mn = players => dispatch => {
    return dispatch({ type: getPlayers10Mn, payload: players });
};
