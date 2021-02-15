import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Actions';
import "./index.css";

import Start from './Game/Start';
import Layout from './Game/Layout/index';
import HighestScores from './Game/HighestScores';
import PlayersScores from './Game/HighestScores/PlayersScores';
import Game from './Game/Game';

class App extends Component {
    componentDidUpdate() {
        if (this.props.SessionExpires < new Date()) {
            window.location.reload();
        }
    };
    handleGameTime = e => this.props.handleGameTime(e.target.name);
    render() {
        if (this.props.Play === false && this.props.Scores !== true ) {
            return <Start />;
        } else if (this.props.Time !== false) {
            return <Layout />;
        } else if (this.props.Scores === true && this.props.ScoresTime === false) {
            return <HighestScores />;
        } else if (this.props.ScoresTime !== false) {
            return <PlayersScores />;
        } else {
            return <Game />;
        };
    };
};

const mapStateToProps = getState => {
    return {
        SessionExpires: getState.SessionExpires,
        Play: getState.Play,
        Scores: getState.Scores,
        Time: getState.Time,
        ScoresTime: getState.ScoresTime
    };
};

export default connect(mapStateToProps, actions)(App);
