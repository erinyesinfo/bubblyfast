import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';

import Header from '../../Header';
import Footer from '../../Footer';

class App extends Component {
    handleScoresTime = e => this.props.handleScoresTime(e.target.name);
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
                    <button type="button" name="30sec" onClick={this.handleScoresTime}>30 sec scores</button>
                    <button type="button" name="2mn" onClick={this.handleScoresTime}>2 mn scores</button>
                    <button type="button" name="10mn" onClick={this.handleScoresTime}>10 mn scores</button>
                    <button type="button" onClick={this.handleBack}>Back</button>
                </div>
                <Footer />
            </div>
        );
    };
};

const mapStateToProps = getState => {
    return { ScoresTime: getState.ScoresTime };
};

export default connect(mapStateToProps, actions)(App);
