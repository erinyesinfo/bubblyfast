import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";

class EndGame extends React.Component {
  node = React.createRef();
  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  };
  handleRef = node => this.node = node;
  handleClick = e => {
    const { endGame } = this.props;
    if ( (!this.node.contains(e.target) && !endGame)
    || (this.node.contains(e.target) && endGame)
    ) {
      return;
    }
  };
  renderShowImage = () => {
    const { endGame, renderEndGameContent } = this.props;
    return (
      <div className={endGame ? 'modal-endGame-active':''}>
        <div id="modal-container-endGame" className={endGame ? 'endGame':'out'}>
          <div className="modal-background-endGame">
            <div className="modal-endGame" ref={this.handleRef}
              onClick={this.handleClick}>
              {renderEndGameContent()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return ReactDOM.createPortal(
      this.renderShowImage(),
      document.querySelector('#modal')
    );
  };
};

export default EndGame;
