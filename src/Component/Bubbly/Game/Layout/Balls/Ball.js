import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';

import bubbleSound from '../../../../../Audio/bubble.mp3';

class Ball extends Component {
    handleAudio = () => {
        let audio = new Audio(bubbleSound);
        return audio.play();
    };
    fadeOutEffect = (target, isTrue) => {
        if (isTrue === true) {
            return setTimeout(() => {
                return this.props.colorsToBeRemovedPlusPoints(target, isTrue);
            }, 50);
        }
        let fadeTarget = target;
        let fadeEffect = setInterval(function () {
            if (!fadeTarget.style.opacity) {
                fadeTarget.style.opacity = 1;
            }
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, 100);
        return setTimeout(() => {
            return this.props.colorsToBeRemovedPlusPoints(target);
        }, 400);
    };
    handleAddOneColor = () => {
        const { id, Colors } = this.props;
        const findBallIndex = Colors.findIndex(color => color.id === id);
        this.props.handleAddOneColor(this.props.NextColor.randomColors, findBallIndex);
    };
    handleClick = e => {
    this.handleAddOneColor();
    const { randomColors, NextColor } = this.props;
    if (NextColor.randomColors === randomColors) {
        // prev 10
        let prev10Target = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
        let prev10 = [ e.target.getAttribute("style"), prev10Target.getAttribute("style") ];
        let prev10ID = [ prev10Target.getAttribute("data-balls") ];
        let prev10Removed = prev10 ? [ prev10Target ]:[];
        let i = 0;
        while(prev10[i] === prev10[i+1] && prev10 !== false) {
            prev10Target = prev10Target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
            prev10.push(prev10Target.getAttribute("style"));
            prev10Removed.push(prev10Target);
            prev10ID.push(prev10Target.getAttribute("data-balls"));
            i++;
            if (prev10[i] !== prev10[i+1]) { prev10.pop();prev10Removed.pop();prev10ID.pop() }
        }
        const checkPrev10 = prev10.filter((p, i) => e.target.getAttribute("style") === prev10[i]);
        const checkPrev10Removed = prev10Removed.filter((p, i) => e.target.getAttribute("style") === prev10Removed[i].getAttribute("style"));
        // next 10
        let next10Target = e.target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
        let next10 = [ e.target.getAttribute("style"), next10Target.getAttribute("style") ];
        let next10ID = [ next10Target.getAttribute("data-balls") ];
        let next10Removed = next10 ? [ next10Target ]:[];
        let j = 0;
        while(next10[j] === next10[j+1] && next10 !== false) {
            next10Target = next10Target.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
            next10.push(next10Target.getAttribute("style"));
            next10Removed.push(next10Target);
            next10ID.push(next10Target.getAttribute("data-balls"));
            j++;
            if (next10[j] !== next10[j+1]) { next10.pop();next10Removed.pop();next10ID.pop(); }
        }
        const checkNext10 = next10.filter((p, i) => e.target.getAttribute("style") === next10[i]);
        const checkNext10Removed = next10Removed.filter((p, i) => e.target.getAttribute("style") === next10Removed[i].getAttribute("style"));
        // prev
        let prevTarget = e.target.previousElementSibling;
        let prev = [ e.target.getAttribute("style"), e.target.previousElementSibling.getAttribute("style") ];
        let prevID = [ e.target.previousElementSibling.getAttribute("data-balls") ];
        let prevRemoved = prev ? [ prevTarget ]:[];
        let k = 0;
        while(prev[k] === prev[k+1] && prev !== false) {
            prevTarget = prevTarget.previousElementSibling;
            prev.push(prevTarget.getAttribute("style"));
            prevRemoved.push(prevTarget);
            prevID.push(prevTarget.getAttribute("data-balls"));
            k++;
            if (prev[k] !== prev[k+1]) { prev.pop();prevRemoved.pop();prevID.pop() }
        }
        const checkPrev = prev.filter((p, i) => e.target.getAttribute("style") === prev[i]);
        const checkPrevRemoved = prevRemoved.filter((p, i) => e.target.getAttribute("style") === prevRemoved[i].getAttribute("style"));
        // next
        let nextTarget = e.target.nextElementSibling;
        let next = [ e.target.getAttribute("style"), e.target.nextElementSibling.getAttribute("style") ];
        let nextID = [ e.target.nextElementSibling.getAttribute("data-balls") ];
        let nextRemoved = next ? [ nextTarget ]:[];
        let m = 0;
        while(next[m] === next[m+1] && next !== false) {
            nextTarget = nextTarget.nextElementSibling;
            next.push(nextTarget.getAttribute("style"));
            nextRemoved.push(nextTarget);
            nextID.push(nextTarget.getAttribute("data-balls"));
            m++;
            if (next[m] !== next[m+1]) { next.pop();nextRemoved.pop();nextID.pop() }
        }
        const checkNext = next.filter((p, i) => e.target.getAttribute("style") === next[i]);
        const checkNextRemoved = nextRemoved.filter((p, i) => e.target.getAttribute("style") === nextRemoved[i].getAttribute("style"));
        let countEachRemovedColors = [];
        //10 targets
        if (((checkPrev10.length === 1 ? 0:checkPrev10.length ) + (checkNext10.length === 1 ? 0:checkNext10.length) - 1) >= 2) {
            countEachRemovedColors.push(prev10ID);
            countEachRemovedColors.push(next10ID);
            checkPrev10Removed.map(p => this.fadeOutEffect(p));
            checkNext10Removed.map(n => this.fadeOutEffect(n));
        }
        if (checkPrev10.length >= 2 || (checkPrev10.length >= 2 && checkNext10.length >= 2)) {
            if (!countEachRemovedColors.find(k => k === prev10ID)) {
                countEachRemovedColors.push(prev10ID);
            }
            checkPrev10Removed.map(p => this.fadeOutEffect(p));
        }
        if (checkNext10.length >= 2 || (checkNext10.length >= 2 && checkPrev10.length >= 2)) {
            if (!countEachRemovedColors.find(k => k === next10ID)) {
                countEachRemovedColors.push(next10ID);
            }
            checkNext10Removed.map(n => this.fadeOutEffect(n));
        }
        //1 targets
        if (((checkPrev.length === 1 ? 0:checkPrev.length) + (checkNext.length === 1 ? 0:checkNext.length) - 1) >= 2) {
            countEachRemovedColors.push(prevID);
            countEachRemovedColors.push(nextID);
            checkPrevRemoved.map(p => this.fadeOutEffect(p));
            checkNextRemoved.map(n => this.fadeOutEffect(n));
        }
        if (checkPrev.length >= 2 || (checkPrev.length >= 2 && checkNext.length >= 2)) {
            if (!countEachRemovedColors.find(k => k === prevID)) {
                countEachRemovedColors.push(prevID);
            }
            checkPrevRemoved.map(p => this.fadeOutEffect(p));
        }
        if (checkNext.length >= 2 || (checkNext.length >= 2 && checkPrev.length >= 2)) {
            if (!countEachRemovedColors.find(k => k === nextID)) {
                countEachRemovedColors.push(nextID);
            }
            checkNextRemoved.map(n => this.fadeOutEffect(n));
        }
        if (((checkPrev10.length === 1 ? 0:checkPrev10.length ) + (checkNext10.length === 1 ? 0:checkNext10.length) - 1) >= 2
        || checkPrev10.length >= 2
        || checkNext10.length >= 2
        || ((checkPrev.length === 1 ? 0:checkPrev.length) + (checkNext.length === 1 ? 0:checkNext.length) - 1) >= 2
        || checkPrev.length >= 2
        || checkNext.length >= 2) {
            this.handleAudio();
            this.props.handleNextColor();
            countEachRemovedColors.push(e.target.getAttribute("data-balls"));
            this.fadeOutEffect(e.target);
            // using id(this will be diferent i passed two argument)
            this.fadeOutEffect(this.props.NextColor.id, true);
        } else {
            this.props.handleNextColor();
        }
        let fixArr = countEachRemovedColors.toString().split(",");
        return this.props.colorsToBeAdded(fixArr);
    } else {
        this.props.handleNextColor();
        }
    };
    render() {
        const { id, style, randomBalls } = this.props;
        return (
            <div className='ball' data-balls={randomBalls} id={id} style={style} onClick={this.handleClick}></div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        Colors: getState.Colors,
        NextColor: getState.NextColor,
    };
};

export default connect(mapStateToProps, actions)(Ball);
