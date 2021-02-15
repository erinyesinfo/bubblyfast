import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import Server from '../../../API'

import Header from '../../Header';
import Footer from '../../Footer';

class Start extends Component {
    componentDidMount() { this.props.handleNextColor() };
    callAPI = async () => {
        const cookies = new Cookies();
        const api = await Server.post("/logout");
        if (api.data === "success") {
            cookies.remove('5cec755218d9-ad3c-4c07-5c78-f907e689');
            return window.location.reload();
        }
    };
    handlePlay = () => this.props.handlePlayGame();
    handleScores = () => this.props.handleShowScores();
    handleCallApi = () => this.callAPI();
    render() {
        return (
            <div className="bubbly-walkthrough">
                <Header />
                <div className="bubbly-time-btns">
                    <button type="button" onClick={this.handlePlay}>Play</button>
                    <button type="button" onClick={this.handleScores}>High Scores</button>
                    <a rel="noopener noreferrer" href="https://erinyes.netlify.app" target="_blank">More</a>
                    <button type="button" onClick={this.handleCallApi}>Log out</button>
                </div>
                <Footer />
            </div>
        );
    };
};

export default connect(null, actions)(Start);
