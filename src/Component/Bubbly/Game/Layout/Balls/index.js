import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Ball from './Ball';
import "./index.css";

import Coin from '../../../../../IMG/Coin.svg';

class Balls extends Component {
    colorsToBeRemovedPlusPoints = (target, isTrue) => {
        this.props.colorsToBeRemoved(target, isTrue);
        this.props.points();
    };
    helperColors = () => {
        const blackColor = { background: "black" };
        return (
            <React.Fragment>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
                <div className='ball hide' style={blackColor}></div>
            </React.Fragment>
        );
    };
    hundredColor = () => {
        return (
            <React.Fragment>
                {this.helperColors()}
                {this.props.Colors.map((color, i) => {                    
                    return <Ball key={color.id} id={color.id}
                        colorsToBeRemovedPlusPoints={this.colorsToBeRemovedPlusPoints}
                        style={color.style}
                        randomColors={color.randomColors}
                        randomBalls={color.randomBalls}
                    />
                })}
                {this.helperColors()}
            </React.Fragment>
        );
    };
    render() {
        return (
            <div>
                <div className="scores-style">
                    <div className="score-description">Your Score:</div>
                    <div className="points">
                        {this.props.Points}
                        <img className="coin" src={Coin} alt="coin" />
                    </div>
                </div>
                <div className='balls'>
                    {this.hundredColor()}
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        Colors: getState.Colors,
        Points: getState.Points,
    };
};

export default connect(mapStateToProps, actions)(Balls);
