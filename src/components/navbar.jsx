import React, { Component } from 'react';
import '../styles/navbar.css';

class Navbar extends Component {
    render() { 
        return ( 
            <nav>
                <h2 className={this.getActiveClass(true)}>Player 1</h2>
                <h2>vs</h2>
                <h2 className={this.getActiveClass(false)}>Player 2</h2>
            </nav>
         );
    }

    getActiveClass = firstPlayerText => {
        const { firstPlayerTurn, gameIsOver } = this.props;
        return (gameIsOver || (firstPlayerTurn && !firstPlayerText) || (!firstPlayerTurn && firstPlayerText)) ?
            '' : 'active';
    };
}

export default Navbar;