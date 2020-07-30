import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../../Actions';
import './index.css';

import Coin from '../../../../../../../../IMG/Coin.svg';

class EndGameContent extends Component {
    playAgain = () => {
        this.props.handleCloseEndGame();
        this.props.playAgainWithDifferentColor();
        this.props.handleGameTime(true);
        return this.props.points(true);
    };
    handleBack = () => {
        this.props.handleCloseEndGame();
        this.props.handlePlayGame(true);
        this.props.handleShowScores(true);
        this.props.handleGameTime(true);
        return this.props.points(true);
    };
    render() {
        const { Points, Username } = this.props;
        return (
            <div className="endGame">
                <div className="username">
                    {Username}
                </div>
                <div className="points">
                    {Points}
                    <img className="coin" src={Coin} alt="coin" />
                </div>
                <div className="game">
                    <button type="button" onClick={this.playAgain}>Play Again</button>
                    <button type="button" className="menu" onClick={this.handleBack}>Menu</button>
                </div>
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return {
        Username: getState.Username,
        Points: getState.Points,
        Time: getState.Time,
    };
};

export default connect(mapStateToProps, actions)(EndGameContent);
