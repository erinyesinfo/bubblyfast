import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Server from '../API';
import BG from '../IMG/1704619.jpg';
import BG_lower from '../IMG/1704619-lower.jpg';
import './App.css';

import Header from './Header';
import Game from './Bubbly/index';
import SignIn from './sign-form/Sign in';
import SignUp from './sign-form/Sign up';

/* helper */
import LazyLoad from './ThirdParty-Library/LazyLoad';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { signup: false };
    };
    async componentDidMount() {
        const cookies = new Cookies();
        const data = { id: '5cec755218d9-ad3c-4c07-5c78-f907e689' };
        const api = await Server.post('/user-login', data);
        if (api.data !== 'failure') {
            if (!document.cookie.includes('5cec755218d9-ad3c-4c07-5c78-f907e689')) {
                const api_logOut = await Server.post("/logout");
                if (api_logOut.data === "success") {
                    return window.location.reload();
                }
            }
            this.props.handleUpdatePlayerId(api.data.id);
            return this.props.handleUsername(api.data.username);
        } else {
            if (cookies.get('5cec755218d9-ad3c-4c07-5c78-f907e689')) {
                cookies.remove('5cec755218d9-ad3c-4c07-5c78-f907e689');
                return window.location.reload();
            }
        }
    };
    handleShowSignup = () => this.setState({ signup: true });
    handleCloseSignup = () => this.setState({ signup: false });
    renderBubbly = () => {
        const cookies = new Cookies();
        const user = cookies.get('5cec755218d9-ad3c-4c07-5c78-f907e689');
        if (user) return <Game />;
        return (
            <div className="forms-container">
                <Header />
                {this.state.signup ?
                    <SignUp handleCloseSignup={this.handleCloseSignup} />
                :<SignIn handleShowSignup={this.handleShowSignup} />}
            </div>
        );
    };
    renderApp = () => {
        const inlineStyling = { display: 'flex' };
        return (
            <React.Fragment>
                <LazyLoad image={{
                    wrapperClassName: 'bubbly-span',
                    className: 'bubbly-span-bg',
                    src: BG,
                    alt: 'background',
                    placeholder: BG_lower,
                    style: inlineStyling
                }}/>
                {this.renderBubbly()}
            </React.Fragment>
        );
    };
    render() {
        return this.renderApp();
    };
};

export default connect(null, actions)(App);
