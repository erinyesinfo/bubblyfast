import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';

import Header from '../../../Header';
import Footer from '../../../Footer';

import Player30Sec from './Players/Player30Sec';
import Player2mn from './Players/Player2mn';
import Player10mn from './Players/Player10mn';

class PlayersScores extends Component {
    handleBack = () => {
        this.props.handlePlayGame(true);
        this.props.handleShowScores(true);
        this.props.handleGameTime(true);
        this.props.handleScoresTime(true);
        return this.props.points(true);
    };
    render() {
        if (this.props.ScoresTime === "30sec") {
            return (
                <div className="bubbly-walkthrough">
                    <Header />
                    <div className="bubbly-time-btns">
                        <Player30Sec />
                        <button type="button" className="scores" onClick={this.handleBack}>Back</button>
                    </div>
                    <Footer />
                </div>
            );
        } else if (this.props.ScoresTime === "2mn") {
            return (
                <div className="bubbly-walkthrough">
                    <Header />
                    <div className="bubbly-time-btns">
                        <Player2mn />
                        <button type="button" className="scores" onClick={this.handleBack}>Back</button>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="bubbly-walkthrough">
                    <Header />
                    <div className="bubbly-time-btns">
                        <Player10mn />
                        <button type="button" className="scores" onClick={this.handleBack}>Back</button>
                    </div>
                    <Footer />
                </div>
            );
        };
    };
};

const mapStateToProps = getState => {
    return { ScoresTime: getState.ScoresTime };
};

export default connect(mapStateToProps, actions)(PlayersScores);
