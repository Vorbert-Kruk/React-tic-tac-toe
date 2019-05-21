import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar.jsx';
import Board from './components/board.jsx';

class App extends Component {
  state = {
    gameIsOver: false,
    firstPlayerTurn: true,
    messageToDisplay: ''
  }
  
  reinitializeGameState = async () => {
    await this.setState({ 
      gameIsOver: false, 
      firstPlayerTurn: true,
      messageToDisplay: ''
    });
  };

  handleChangeTurn = () => {
    const { gameIsOver, firstPlayerTurn, messageToDisplay } = this.state; 
    this.setState({
      gameIsOver: gameIsOver, 
      firstPlayerTurn: !firstPlayerTurn,
      messageToDisplay: messageToDisplay
    });
  };

  handleGameEnd = async playerHasWon => {
    const { firstPlayerTurn } = this.state; 
    await this.setState({ 
      gameIsOver: true, 
      firstPlayerTurn: firstPlayerTurn, 
      messageToDisplay: this.getGameResults(playerHasWon)});
    console.log(`Gra została zakończona!.\n${this.getGameResults(playerHasWon)}`);
  };

  getGameResults = playerHasWon => {
    const { firstPlayerTurn } = this.state;
    return !playerHasWon ? 
      `It's a tie!` :
      firstPlayerTurn ?
        `Player 1 is the winner!` :
        `Player 2 is the winner!`;
  };

  render() {
    return (
      <div className="App">
        <Navbar firstPlayerTurn={this.state.firstPlayerTurn} gameIsOver={this.state.gameIsOver}/>
        <Board gameData={this.state} handleChangeTurn={this.handleChangeTurn} handleGameEnd={this.handleGameEnd} reinitializeGameState={this.reinitializeGameState} messageToDisplay={this.state.messageToDisplay}/>
      </div>
    );
  }
}

export default App;
