import React from "react";
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../../../../../../Actions';
import "./index.css";

class Leave extends React.Component {
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleClick = e => {
    const { showLeave } = this.props;
    if (e.target && showLeave) {
      return;
    }
  };

  // modal content functions
  playAgain = () => {
    this.props.handleCloseLeave();
    this.props.playAgainWithDifferentColor();
    this.props.handleGameTime(true);
    return this.props.points(true);
  };
  handleBack = () => {
    this.props.handleCloseLeave();
    this.props.playAgainWithDifferentColor();
    this.props.handlePlayGame(true);
    this.props.handleShowScores(true);
    this.props.handleGameTime(true);
    return this.props.points(true);
  };
  renderModalContent = () => {
    if (this.props.playAgain) {
      return (
        <div className="leave">
          <p>Are you sure you want to leave!</p>
          <button type="button" className="yes" onClick={this.playAgain}>Yes</button>
          <button type="button" className="no" onClick={this.props.handleCloseLeave}>No</button>
        </div>
      );
    } else {
      return (
        <div className="leave">
          <p>Are you sure you want to leave!</p>
          <button type="button" className="yes" onClick={this.handleBack}>Yes</button>
          <button type="button" className="no" onClick={this.props.handleCloseLeave}>No</button>
        </div>
      );
    };
  };
  renderShowLeave = () => {
    const { showLeave } = this.props;
    return (
      <div className={showLeave ? 'modal-leave-active':''}>
        <div id="modal-container-leave" className={showLeave ? 'leave':'out'}>
          <div className="modal-background-leave">
            <div className="modal-leave" onClick={this.handleClick}>
              {this.renderModalContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderShowLeave(),
      document.querySelector('#modal')
    );
  };
};

export default connect(null, actions)(Leave);
