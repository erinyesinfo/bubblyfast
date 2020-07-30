import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../Actions';
import Server from '../../../../../API';

// Play-again modal
import EndGame from './Modal/Play Again';
// Play-again modal-content
import EndGameContent from './Modal/Play Again/Content';

class Header extends Component {
    _intervalID;
    constructor(props) {
        super(props);
        this.state = {
            errors: false,
            time: null,
            redColor: false,
            endGame: false// modal
        };
    };
    callAPI = async () => {
        const data = {
            id: this.props.PlayerID,
            points: this.props.Points
        };
        if (this.props.Time === "30sec") {
            const api = await Server.post("/createPlayer-30sec", data);
            if (api.data === "failure") {
                return this.setState({ errors: true });
            } else {
                return this.setState({ errors: false });
            }
        } else if (this.props.Time === "2mn") {
            const api = await Server.post("/createPlayer-2mn", data);
            if (api.data === "failure") {
                return this.setState({ errors: true });
            } else {
                return this.setState({ errors: false });
            }
        } else if (this.props.Time === "10mn") {
            const api = await Server.post("/createPlayer-10mn", data);
            if (api.data === "failure") {
                return this.setState({ errors: true });
            } else {
                return this.setState({ errors: false });
            }
        }
    };
    componentWillUnmount() {
        clearInterval(this._intervalID);
        window.onbeforeunload = function() {}
    };
    onTime30sec = () => {
        if (!document.querySelector(".balls")) {
            var countDownDate = new Date().getTime() + 30000;
            window.onbeforeunload = function() {
                return "This page is asking you to confirm that you want to leave - data you have entered may not be saved.";
            };
            this._intervalID = setInterval(() => {
                // Get today's date and time
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance > 0) {
                    // Time calculations for minutes and seconds
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    this.setState({ time: minutes + "m " + seconds + "s " });
                    if (distance < 10000) {
                        this.setState({ redColor: true });
                    }
                } else {
                    window.onbeforeunload = function() {}
                    clearInterval(this._intervalID);
                    this.setState({ time: "EXPIRED" });
                    this.callAPI();
                    return this.handleShowEndGame()
                }
            }, 1000);
        } return null
    };
    onTime2mn = () => {
        if (!document.querySelector(".balls")) {
            // Set the date we're counting down to
            var countDownDate = new Date().getTime() + 120000;
            window.onbeforeunload = function() {
                return "This page is asking you to confirm that you want to leave - data you have entered may not be saved.";
            };
            this._intervalID = setInterval(() => {
                // Get today's date and time
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance > 0) {
                    // Time calculations for minutes and seconds
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    this.setState({ time: minutes + "m " + seconds + "s " });
                    if (distance < 10000) {
                        this.setState({ redColor: true });
                    }
                } else {
                    window.onbeforeunload = function() {}
                    clearInterval(this._intervalID);
                    this.setState({ time: "EXPIRED" });
                    this.callAPI();
                    return this.handleShowEndGame()
                }
            }, 1000);
        } return null
    };
    onTime10mn = () => {
        if (!document.querySelector(".balls")) {
            // Set the date we're counting down to
            var countDownDate = new Date().getTime() + 600000;
            window.onbeforeunload = function() {
                return "This page is asking you to confirm that you want to leave - data you have entered may not be saved.";
            };
            this._intervalID = setInterval(() => {
                // Get today's date and time
                var now = new Date().getTime();
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
                if (distance > 0) {
                    // Time calculations for minutes and seconds
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    this.setState({ time: minutes + "m " + seconds + "s " });
                    if (distance < 10000) {
                        this.setState({ redColor: true });
                    }
                } else {
                    window.onbeforeunload = function() {}
                    clearInterval(this._intervalID);
                    this.setState({ time: "EXPIRED" });
                    this.callAPI();
                    return this.handleShowEndGame()
                }
            }, 1000);
        } return null
    };

    // endgame modal
    handleShowEndGame = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ endGame: true });
    };
    handleCloseEndGame = () => {
        let element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.setState({ endGame: false });
    };
    renderEndGameContent = () => {
        return (
            <EndGameContent handleCloseEndGame={this.handleCloseEndGame}
                endGame={this.state.endGame}
            />
        );
    };
    renderEndGame = () => {// show end game modal
        return (
            <EndGame handleShowEndGame={this.handleShowEndGame}
                handleCloseEndGame={this.handleCloseEndGame}
                renderEndGameContent={this.renderEndGameContent}
                endGame={this.state.endGame}
                isEndGame={this.state.isEndGame}
            />
        );
    };
    render() {
        const { Time, NextColor } = this.props;
        let style = { background: NextColor };
        return (
            <React.Fragment>
                <div className='sideBar-header'>
                    <div className="ball-cover">
                        <div className="ball" style={style}></div>
                    </div>
                    <div className={this.state.redColor ? 'innerHeader red':'innerHeader'}>
                        {Time === "2mn" ?
                            this.onTime2mn()
                        :Time === "10mn" ?
                            this.onTime10mn()
                        :this.onTime30sec()}
                        {this.state.time}
                    </div>
                </div>
                {/* Modals */}
                {this.state.endGame ?
                    this.renderEndGame()
                :null}
            </React.Fragment>
        );
    };
};

const mapStateToProps = getState => {
    return {
        PlayerID: getState.PlayerID,
        Points: getState.Points,
        Time: getState.Time,
        NextColor: getState.NextColor.randomColors,
    };
};

export default connect(mapStateToProps, actions)(Header);
