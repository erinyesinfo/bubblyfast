import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import "./index.css";

import Start from './Game/Start';
import Layout from './Game/Layout/index';
import HighestScores from './Game/HighestScores';
import HighestScores2 from './Game/HighestScores2';
import Game from './Game/Game';

class App extends Component {
    componentDidUpdate() {
        if (!document.cookie.includes('5cec755218d9-ad3c-4c07-5c78-f907e689')) {
            window.location.reload();
        }
    };
    handleGameTime = e => this.props.handleGameTime(e.target.name);
    handleBack = () => {
        this.props.handlePlayGame(true);
        this.props.handleShowScores(true);
        this.props.handleGameTime(true);
        this.props.handleScoresTime(true);
        return this.props.points(true);
    };
    render() {
        if (this.props.Play === false && this.props.Scores !== true ) {
            return <Start />;
        } else if (this.props.Time !== false) {
            return <Layout />;
        } else if (this.props.Scores === true && this.props.ScoresTime === false) {
            return <HighestScores />;
        } else if (this.props.ScoresTime !== false) {
            return <HighestScores2 />;
        } else {
            return <Game />;
        };
    };
};

const mapStateToProps = getState => {
    return {
        Play: getState.Play,
        Scores: getState.Scores,
        Time: getState.Time,
        ScoresTime: getState.ScoresTime,
    };
};

export default connect(mapStateToProps, actions)(App);
