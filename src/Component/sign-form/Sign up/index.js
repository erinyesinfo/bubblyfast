import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import * as actions from '../../../Actions';
import Server from '../../../API';
import './index.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: [],
            usernameFocus: false,
            emailFocus: false,
            passwordFocus: false,
            showPassword: false,
            spinner: false
        };
    };
    
    callAPI = async () => {
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        const api = await Server.post("/register", data);
        if (typeof(api.data) !== "string") {
            return this.setState({ errors: api.data }, this.handleCloseSpinner);
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
    // email focus
    onEmailFocus = () => this.setState({ emailFocus: true });
    onEmailBlur = () => this.setState({ emailFocus: false });
    // password focus
    onPasswordFocus = () => this.setState({ passwordFocus: true });
    onPasswordBlur = () => this.setState({ passwordFocus: false });
    handleTogglePassword = () => this.setState(st => ({ showPassword: !st.showPassword }));
    render() {
        return (
            <form onSubmit={this.handleSubmit} action="/register" method="POST" className="form-register">
                <div className="register-inputs">
                    <label htmlFor="username-register" className={this.state.usernameFocus ? "username-active":""}>
                        <small>Username</small>
                    </label>
                    <input type="text" name="username" id="username-register"
                        placeholder="Pick a username" autoFocus
                        onChange={this.handleChange} value={this.state.username}
                        onFocus={this.onUsernameFocus} onBlur={this.onUsernameBlur}
                    />
                    {this.state.errors.map(e => {
                        if (e.includes("username") || e.includes("Username")) {
                            return <div key={e} className="login-inputs errors">{e}</div>
                        } return null;
                    })}
                </div>
                <div className="register-inputs">
                    <label htmlFor="email-register" className={this.state.emailFocus ? "email-active":""}>
                        <small>Email</small>
                    </label>
                    <input type="email" name="email" id="email-register" placeholder="you@example.com"
                        onChange={this.handleChange} value={this.state.email}
                        onFocus={this.onEmailFocus} onBlur={this.onEmailBlur}
                    />
                    {this.state.errors.map(e => {
                        if (e.includes("email")) {
                            return <div key={e} className="login-inputs errors">{e}</div>
                        } return null;
                    })}
                </div>     
                <div className="register-inputs pw">
                    <label htmlFor="password-register" className={this.state.passwordFocus ? "password-active":""}>
                        <small>Password</small>
                        <span className="eye" onClick={this.handleTogglePassword}>
                            {this.state.showPassword ? <i className="fas fa-eye-slash"></i>
                            :<i className="fas fa-eye"></i>}
                        </span>
                    </label>
                    <input name="password" id="password-register"
                        type={this.state.showPassword ? "text":"password"}
                        placeholder="Create a password"
                        onChange={this.handleChange} value={this.state.password}
                        onFocus={this.onPasswordFocus} onBlur={this.onPasswordBlur}
                    />
                    {this.state.errors.map(e => {
                        if (e.includes("password") || e.includes("Password")) {
                            return <div key={e} className="register-inputs errors">{e}</div>
                        } return null;
                    })}
                </div>
                {this.state.spinner ? (
                    <div className="spinner"><i className="fas fa-circle-notch"></i></div>
                ):null}
                <button type="submit" className="signUp-btn">
                    Sign up
                </button>
                <span className="logIn" onClick={this.props.handleCloseSignup}>Log in</span>
            </form>
        );
    };
};

export default connect(null, actions)(SignUp);
