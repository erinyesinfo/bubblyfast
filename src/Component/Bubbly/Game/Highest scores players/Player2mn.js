import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../Actions';
import Server from '../../../../API';
import './Player.css';

import Coin from '../../../../IMG/Coin.svg';
// winner icons
import winner1 from '../../../../IMG/icon/trophy.svg';
import winner2 from '../../../../IMG/icon/Award, champion, general, office, prize, ribbon, winner icon.svg';
import winner3 from '../../../../IMG/icon/Award, badge, prize icon.svg';
import winner4 from '../../../../IMG/icon/medal.svg';

class Player30Sec extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: false,
        };
    };
    componentDidMount() { this.callAPI(); };
    callAPI = async () => {
        const api = await Server.get("/readPlayer-2mn");
        if (api.data === "failure") {
            return this.setState({ errors: true });
        } else {
            this.props.handlePlayers2Mn(JSON.parse(api.data || "[]"));
            return this.setState({ errors: false });
        }
    };
    render() {
        if (this.props.Players2Mn.length > 0) {
            return (
                <div className="players">
                    {this.props.Players2Mn.map((palyer, i) => {
                        if (i === 0 || i === 1 || i === 2) {
                            return (
                                <div className="player gold" key={palyer.username}>
                                    {i === 0 ? (
                                        <img className="icon winner" src={winner1} alt="winner1" />
                                    ):i === 1 ? (
                                        <img className="icon" src={winner2} alt="winner2" />
                                    ):<img className="icon" src={winner3} alt="winner3" />}
                                    <div className="username">{palyer.username}</div>
                                    <div className="points">
                                        {palyer.points}
                                        <img className="coin" src={Coin} alt="coin" />
                                    </div>
                                </div>
                            );
                        } return (
                            <div className="player silver" key={palyer.username}>
                                <img className="icon" src={winner4} alt="loser" />
                                <div className="username">{palyer.username}</div>
                                <div className="points">
                                    {palyer.points}
                                    <img className="coin" src={Coin} alt="coin" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        } return null;
    };
};

const mapStateToProps = getState => {
    return { Players2Mn: getState.Players2Mn };
};

export default connect(mapStateToProps, actions)(Player30Sec);
