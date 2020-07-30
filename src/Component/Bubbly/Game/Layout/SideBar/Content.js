import React, { Component } from 'react';

// Leave Modal
import Leave from './Modal/Leave';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playAgain: false,
            showLeave: false// modal
        };
    };
    // leave modal
    handleShowLeave = e => {
        if (e.target.name === 'playAgain') {
            this.setState({ playAgain: true });
        }
        var element = document.querySelector('body');
        element.style.overflow = 'hidden';
        this.setState({ showLeave: true });
    };
    handleCloseLeave = () => {
        var element = document.querySelector('body');
        element.style.overflow = 'auto';
        this.setState({ showLeave: false, playAgain: false });
    };
    renderLeave = () => {// show leave modal
        return (
            <Leave handleCloseLeave={this.handleCloseLeave}
                showLeave={this.state.showLeave}
                playAgain={this.state.playAgain}
            />
        );
    };
    render() {
        return (
            <React.Fragment>
                <div className="sideBar-content">
                    <div className="btns">
                        <button type="button" name="playAgain" className="playAgain"
                        onClick={this.handleShowLeave}>
                            Play Again
                        </button>
                        <button type="button" className="exit" onClick={this.handleShowLeave}>EXIT GAME</button>
                    </div>
                </div>
                {/* Modals */}
                {this.state.showLeave ?
                    this.renderLeave()
                :null}
            </React.Fragment>
        );
    };
};

export default Content;
