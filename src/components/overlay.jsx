import React, { Component } from 'react';
import '../styles/overlay.css';

class Overlay extends Component {
    // state = {
    //     visible: false
    // };
    render() { 
        return ( 
            <div className={this.getCurrentClasses()}>
                <div className="overlay-content">
                    {this.displayMessage()}
                </div>
            </div>
         );
    }
    getCurrentClasses = () => `board-overlay ${this.props.messageToDisplay.length > 0 ? 'active' : ''}`;

    displayMessage = () => {
    const { messageToDisplay: message } = this.props; 
        return message.length > 0 ?
            message : '';
    };
}
 
export default Overlay;