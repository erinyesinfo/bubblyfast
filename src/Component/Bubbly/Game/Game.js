import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';

import Header from '../../Header';
import Footer from '../../Footer';

class Game extends Component {
    handleGameTime = e => this.props.handleGameTime(e.target.name);
    handleBack = () => {
        this.props.handlePlayGame(true);
        this.props.handleShowScores(true);
        this.props.handleGameTime(true);
        this.props.handleScoresTime(true);
        return this.props.points(true);
    };
    render() {
        return (
            <div className="bubbly-walkthrough">
                <Header />
                <div className="bubbly-time-btns">
                    <button type="button" name="30sec" onClick={this.handleGameTime}>30 sec</button>
                    <button type="button" name="2mn" onClick={this.handleGameTime}>2 mn</button>
                    <button type="button" name="10mn" onClick={this.handleGameTime}>10 mn</button>
                    <button type="button" onClick={this.handleBack}>Back</button>
                </div>
                <Footer />
            </div>
        );
    };
};

export default connect(null, actions)(Game);
