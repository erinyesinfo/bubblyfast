import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import Server from '../../../API';
import './index.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: false,
            usernameFocus: false,
            passwordFocus: false,
            spinner: false
        };
    };
    
    callAPI = async () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        };
        let errors = [];
        if (this.state.password === "") {
            errors.push("You must provide a password.");
        } else if (this.state.password.length > 0 && this.state.password.length < 8) {
            errors.push("Password must be at least 8 characters.");
        } else if (this.state.password.length > 50) {
            errors.push("Password cannot exceed 50 characters.");
        }
        if (this.state.username.length > 0 && this.state.username.length < 3) {
            errors.push("Username must be at least 3 characters.");
        } else if (this.state.username.length > 30) {
            errors.push("Username cannot exceed 30 characters.");
        }

        if (errors.length > 0) {
            return this.setState({ errors: true }, this.handleCloseSpinner);
        }
        const api = await Server.post("/login", data);
        if (api.data !== "success") {
            return this.setState({ errors: true }, this.handleCloseSpinner);
        } else {
            this.handleCloseSpinner();
            let day = 1000 * 3600 * 24;
            const cookies = new Cookies();
            const option = {
                path: '/',
                expires: new Date(Date.now() + day),
                cookie: { maxAge: day },
                sameSite: 'lax',
                secure: true
            };
            cookies.set('5cec755218d9-ad3c-4c07-5c78-f907e689', 'f907e689-5c78-4c07-ad3c-5cec755218d9', option);
            this.setState({ errors: false });
            return window.location.reload();
        };
    };
    handleChange = e => {
        if (e.target.name === 'password') {
            return this.setState({ password: e.target.value });
        }
        let value = e.target.value.replace(/(<|>|&)/g, '');
        this.setState({ [e.target.name]: value.replace(/ +/g, '') });
    };
    handleShowSpinner = () => this.setState({ spinner: true });
    handleCloseSpinner = () => this.setState({ spinner: false });
    handleSubmit = async e => {
        e.preventDefault();
        await this.handleShowSpinner();
        this.callAPI();
    };
    onUsernameFocus = () => this.setState({ usernameFocus: true });
    onUsernameBlur = () => this.setState({ usernameFocus: false });
    // password focus
    onPasswordFocus = () => this.setState({ passwordFocus: true });
    onPasswordBlur = () => this.setState({ passwordFocus: false });
    render() {
        return (
            <form onSubmit={this.handleSubmit} action="/login" method="POST" className="form-login">
                <div className="login-inputs">
                    <label htmlFor="username" className={this.state.usernameFocus ? "username-active":""}>Username</label>
                    <input type="text" name="username" id="username"
                        placeholder="Username" autoFocus
                        onChange={this.handleChange} value={this.state.username}
                        onFocus={this.onUsernameFocus} onBlur={this.onUsernameBlur}
                    />
                </div>
                <div className="login-inputs">
                    <label htmlFor="password" className={this.state.passwordFocus ? "password-active":""}>Password</label>
                    <input type="password" name="password" id="password" placeholder="Password"
                        onChange={this.handleChange} value={this.state.password}
                        onFocus={this.onPasswordFocus} onBlur={this.onPasswordBlur}
                    />
                </div>
                {this.state.errors ?
                    <div className="login-inputs errors">Username or password are not valid</div>
                :null}
                {this.state.spinner ? (
                    <div className="spinner"><i className="fas fa-circle-notch"></i></div>
                ):null}
                <button className="signIn-btn">Sign In</button>
                <span className="registre" onClick={this.props.handleShowSignup}>Registre</span>
            </form>
        );
    };
};

export default connect(null, actions)(SignIn);
