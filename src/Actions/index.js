import { v4 as uuid } from 'uuid';// Library that generate random id's
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

/* Add one color when you click on ball */
export const handleAddOneColor = (color, i, sameballsID) => (dispatch, getState) => {
    const oneColor = Array.from({ length: 1 }).fill().map(()=> {
        const style = { background: color };
        return ({
            id: JSON.parse(window.localStorage.getItem("8052e6b9-48e6-4082-ad7c-38a14b9ee9d5") || uuid()),
            randomBalls: "oneBall",
            randomColors: color,
            style,
            sameballsID: sameballsID || 'b'+uuid()
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

    let Colors = data.map(function(c) { return c.id });
    let isDuplicate = Colors.some(function(c, idx){ 
        return Colors.indexOf(c) !== idx 
    });
    if (isDuplicate) {
        let Colors = data.map(c => { return { ...c, id: uuid() } });
        return dispatch({ type: getColors, payload: Colors });
    }

    return dispatch({ type: getColors, payload: data });
};

/* Leave or restart the game */
export const playAgainWithDifferentColor = () => dispatch => {
   /*
    *
    * creating max of 100 color
    * 
    */

    let colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];

    // creating 20 arrays with different balls(2, 3, 4, 5)
    const Colors = Array.from({ length: 20 }).fill().map(()=> {
        let randomBalls = [ "oneBall", "twoBalls", "threeBalls", "fourBalls", "fiveBalls" ];
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        let style = { background: randomColors };
        return ({
            randomBalls: randomBalls[Math.floor(Math.random() * randomBalls.length)],
            randomColors,
            style
        })
    });

    // find each ball category in order to duplicate based ball name
    const find = Colors.map(color =>
        color.randomBalls === "oneBall" ? 1
        :color.randomBalls === "twoBalls" ? 2
        :color.randomBalls === "threeBalls" ? 3
        :color.randomBalls === "fourBalls" ? 4
        :5
    );
    // duplicate colors based on names(randomBalls)
    const bubble20Color = find.map(f => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: f }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: (f === 1 ? "oneBall": f === 2 ? "twoBalls": f === 3 ? "threeBalls":f === 4 ? "fourBalls":"fiveBalls"),
                randomColors,
                style
            })
        });
    });

    /*
    * 
    * Adding bubbleMultipleColors, bubble1Color, bubble2Color, bubble3Color, bubble4Color, bubble5Color
    * bubbleMultipleColors add randomBalls from 1 to 5
    * bubbleMultipleColors used many times in maxOf100Color
    * bubbleMultipleColors not used when array length in the while loop is 99, 98, 97, 96, 95
    * 
    * bubble1Color add randomBalls of only 1
    * bubble1Color used only one time in maxOf100Color when we are on 99, so we can add one
    * 
    * bubble2Color add randomBalls of only 2
    * bubble2Color used only one time in maxOf100Color when we are on 98, so we can add two
    * 
    * bubble3Color add randomBalls of only 3
    * bubble3Color used only one time in maxOf100Color when we are on 97, so we can add three
    * 
    * bubble4Color add randomBalls of only 4
    * bubble4Color used only one time in maxOf100Color when we are on 96, so we can add four
    * 
    * bubble5Color add randomBalls of only 5
    * bubble5Color used only one time in maxOf100Color when we are on 95, so we can add five
    * 
    * in order to get a total of 100 color
    * 
    */

    const bubbleMultipleColors = Array.from({ length: 1 }).map(() => {
        let f = Math.ceil(Math.random() * 5);
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 1 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: (f === 1 ? "oneBall": f === 2 ? "twoBalls": f === 3 ? "threeBalls":f === 4 ? "fourBalls":"fiveBalls"),
                randomColors,
                style
            })
        });
    });

    const bubble1Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 1 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "oneBall",
                randomColors,
                style
            })
        });
    });

    const bubble2Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 2 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "twoBalls",
                randomColors,
                style
            })
        });
    });

    const bubble3Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 3 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "threeBalls",
                randomColors,
                style
            })
        });
    });

    const bubble4Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 4 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "fourBalls",
                randomColors,
                style
            })
        });
    });

    const bubble5Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 5 }).fill().map(()=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "fiveBalls",
                randomColors,
                style
            })
        });
    });

    /*
    * helper to make each chain of colors connected with an id
    * that can make a chain removed with only oneclick
    */
    function optimizeMe(arr, start) {
        if (start === arr.length) return arr;
        /*
         * Adding one letter before uuid
         * Because i need to loop using document.querySelectorAll
         * document.querySelectorAll only accept id's that start with a letter
        */
        let sameballsID = 'b' + uuid();
        let i = start || 0
        for(i;i<arr.length;i++) {
            if (arr[i].style.background === arr[start].style.background) {
                arr[i] = { ...arr[i], sameballsID, id: uuid() }
            } else {
                break;
            }
        }
        return optimizeMe(arr, i);
    };

    /*
    * helper to check if we have 100 color
    * else keep repeating until we have 100 color
    */
    function maxOf100Color(arr) {
        if (arr.length === 100 && !(arr.length > 100)) {
            return optimizeMe(arr, 0);
        }
        if (arr.length === 0) {
            return maxOf100Color(bubble20Color);
        } else {
            let newArr = []
            arr.map(b => newArr.push(...b));
            while(newArr.length < 100) {
                if (newArr.length === 95) {
                    let b5 = []
                    bubble5Color.map(b => b5.push(...b));
                    newArr = [ ...newArr, ...b5 ];
                } else if (newArr.length === 96) {
                    let b4 = []
                    bubble4Color.map(b => b4.push(...b));
                    newArr = [ ...newArr, ...b4 ];
                } else if (newArr.length === 97) {
                    let b3 = []
                    bubble3Color.map(b => b3.push(...b));
                    newArr = [ ...newArr, ...b3 ];
                } else if (newArr.length === 98) {
                    let b2 = []
                    bubble2Color.map(b => b2.push(...b));
                    newArr = [ ...newArr, ...b2 ];
                } else if (newArr.length === 99) {
                    let b1 = []
                    bubble1Color.map(b => b1.push(...b));
                    newArr = [ ...newArr, ...b1 ];
                } else {
                    let bMultiple = []
                    bubbleMultipleColors.map(b => bMultiple.push(...b));
                    newArr = [ ...newArr, ...bMultiple ];
                }
            }
            return maxOf100Color(newArr);
        }
    }

    let INIALSTATE = maxOf100Color([]);
    return dispatch({ type: getColors, payload: INIALSTATE });
};

/* Next color to be selected */
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

/* Used when you click the wrong ball in game */
export const handleColorsOptimize = () => (dispatch, getState) => {
    function optimizeMe(arr, start) {
        if (start === arr.length) return arr;
        /*
         * Adding one letter before uuid
         * Because i need to loop using document.querySelectorAll
         * document.querySelectorAll only accept id's that start with a letter
        */
        let sameballsID = 'b' + uuid();
        let i = start || 0
        for(i;i<arr.length;i++) {
            if (arr[i].style.background === arr[start].style.background) {
                arr[i] = { ...arr[i], sameballsID }
            } else {
                break;
            }
        }
        return optimizeMe(arr, i);
    };
    const data = optimizeMe([...getState().Colors], 0)
    return dispatch({ type: getNextColor, payload: data });
};

/* Colors remove based on chains of id's */
export const colorsToBeRemoved = sameballsID => (dispatch, getState) => {
    const data = [...getState().Colors].filter(i => i.sameballsID !== sameballsID);
    return dispatch({ type: getColors, payload: data });
};

/* When you remove colors you need to add more colors */
export const handleAddColors = () => (dispatch, getState) => {
    let colors = [ "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)", "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)", "linear-gradient(180deg, #2af598 0%, #009efd 100%)", "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", "linear-gradient(to top, #30cfd0 0%, #330867 100%)", "linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%)", "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)" ];
    const bubbleMultipleColors = Array.from({ length: 1 }).map(() => {
        let f = Math.ceil(Math.random() * 5);
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 1 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: (f === 1 ? "oneBall": f === 2 ? "twoBalls": f === 3 ? "threeBalls":f === 4 ? "fourBalls":"fiveBalls"),
                randomColors,
                style
            })
        });
    });
    
    const bubble1Color = Array.from({ length: 1 }).map(() => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 1 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "oneBall",
                randomColors,
                style
            })
        });
    });
    
    const bubble2Color = Array.from({ length: 1 }).map(f => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 2 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "twoBalls",
                randomColors,
                style
            })
        });
    });
    
    const bubble3Color = Array.from({ length: 1 }).map(f => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 3 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "threeBalls",
                randomColors,
                style
            })
        });
    });
    
    const bubble4Color = Array.from({ length: 1 }).map(f => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 4 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "fourBalls",
                randomColors,
                style
            })
        });
    });
    
    const bubble5Color = Array.from({ length: 1 }).map(f => {
        let randomColors = colors[Math.floor(Math.random() * colors.length)];
        return Array.from({ length: 5 }).fill().map((x)=> {
            let style = { background: randomColors };
            return ({
                randomBalls: "fiveBalls",
                randomColors,
                style
            })
        });
    });
    
    let newArr = [ ...getState().Colors ]
    while(newArr.length < 100) {
        if (newArr.length === 95) {
            let b5 = []
            bubble5Color.map(b => b5.push(...b));
            newArr = [ ...newArr, ...b5 ];
        } else if (newArr.length === 96) {
            let b4 = []
            bubble4Color.map(b => b4.push(...b));
            newArr = [ ...newArr, ...b4 ];
        } else if (newArr.length === 97) {
            let b3 = []
            bubble3Color.map(b => b3.push(...b));
            newArr = [ ...newArr, ...b3 ];
        } else if (newArr.length === 98) {
            let b2 = []
            bubble2Color.map(b => b2.push(...b));
            newArr = [ ...newArr, ...b2 ];
        } else if (newArr.length === 99) {
            let b1 = []
            bubble1Color.map(b => b1.push(...b));
            newArr = [ ...newArr, ...b1 ];
        } else {
            let bMultiple = []
            bubbleMultipleColors.map(b => bMultiple.push(...b));
            newArr = [ ...newArr, ...bMultiple ];
        }
    }
    function optimizeMe(arr, start) {
        if (start === arr.length) return arr;
        /*
         * Adding one letter before uuid
         * Because i need to loop using document.querySelectorAll
         * document.querySelectorAll only accept id's that start with a letter
        */
        let sameballsID = 'b' + uuid();
        let i = start || 0
        for(i;i<arr.length;i++) {
            if (arr[i].style.background === arr[start].style.background) {
                arr[i] = { ...arr[i], sameballsID, id: uuid() }
            } else {
                break;
            }
        }
        return optimizeMe(arr, i);
    };
    return dispatch({ type: getColors, payload: optimizeMe(newArr, 0) });
};

export const handleUpdatePlayerId = id => dispatch => {
    dispatch({ type: getPlayerID, payload: id });
};

/* Each ball worth 10 point */
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
