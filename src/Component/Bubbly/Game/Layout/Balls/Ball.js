import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';

import bubbleSound from '../../../../../Audio/bubble.mp3';

class Ball extends Component {
    handleAudio = () => {
        let audio = new Audio(bubbleSound);
        return audio.play();
    };
    handleAddOneColor = sameballsID => {
        const { id, Colors } = this.props;
        const findBallIndex = Colors.findIndex(color => color.id === id);
        this.props.handleAddOneColor(this.props.NextColor, findBallIndex, sameballsID);
    };
    handleClick = e => {
        const { randomColor, NextColor, sameballsID } = this.props;

        let prevTarget = e.target.previousElementSibling;
        let nextTarget = e.target.nextElementSibling;
        const isMoreThanOne = (prevTarget.getAttribute("style") === e.target.getAttribute("style")
        || nextTarget.getAttribute("style") === e.target.getAttribute("style")) ? true:false

        // same color
        if (NextColor === randomColor) {
            this.handleAddOneColor(sameballsID);
            // more than one ball
            if (isMoreThanOne) {
                const timeOut = setTimeout(() => {
                    document.querySelectorAll("#"+sameballsID).forEach(elm => {
                        elm.classList.add('ball-fadeout')
                        this.props.points()
                    });
                    this.handleAudio()
                    clearTimeout(timeOut)
                }, 150);
                
                const timeOut2 = setTimeout(() => {
                    this.props.colorsToBeRemoved(sameballsID)
                    this.props.handleNextColor();
                    this.props.handleAddColors();
                    clearTimeout(timeOut2)
                }, 200);
            }
        } else {
            // different color
            this.handleAddOneColor('');
            this.props.handleColorsOptimize()
            this.props.handleNextColor();
        }
    };
    render() {
        const { id, randomColor, randomBall, sameballsID } = this.props;
        let style = { background: randomColor };
        return (
            <div id={sameballsID} className='ball' data-ball={randomBall} ball={id}
             style={style} onClick={this.handleClick}></div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        Colors: getState.Colors,
        NextColor: getState.NextColor.color
    };
};

export default connect(mapStateToProps, actions)(Ball);
