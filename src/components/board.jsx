import React, { Component } from 'react';
import BoardPiece from './boardpiece.jsx';
import Overlay from './overlay.jsx';
import '../styles/board.css';

class Board extends Component {
    constructor() {
        super();
        // Inicjalizacja 9 kwadracików na planszy
        const pieces = [];
        for(let i = 0; i < 9; i++)
            pieces.push({ 
                firstPlayerClicked: undefined
            });
        this.state = { pieces: pieces };
    }

    render() { 
        return ( 
            <React.Fragment>
            <div className="board">
                {this.state.pieces.map((piece, pieceIndex) => 
                <BoardPiece pieceIndex={pieceIndex} key={pieceIndex} handleClick={this.handleClick} firstPlayerClicked={piece.firstPlayerClicked}/> )}
                <Overlay messageToDisplay={this.props.messageToDisplay}/>
            </div>
            <button className="restart-btn" onClick={this.handleGameRestart}>
                Restart the game
            </button>
            </React.Fragment>    
         );
    }

    handleClick = async index => {
        const { gameIsOver, firstPlayerTurn } = this.props.gameData;
        const { handleChangeTurn, handleGameEnd } = this.props;
        if(gameIsOver || this.pieceWasClicked(index)) 
            return;
        await this.changePiece(index, firstPlayerTurn);
        if(this.gameHasEnded())
            await handleGameEnd(this.playerHasWon());
        handleChangeTurn();
    };

    handleGameRestart = async () => {
        await this.reinitializeBoardState();
        await this.props.reinitializeGameState();
        console.log('Gra została zrestartowana');
    };

    reinitializeBoardState = async () => {
        await this.setState({
            pieces: [...Array(9).keys()].map(() => {
                return { firstPlayerClicked: undefined };
            }
        )});
    };

    changePiece = async (pieceIndex, firstPlayerClicked = true) => {
        const pieces = [...this.state.pieces];
        pieces[pieceIndex] = { firstPlayerClicked: firstPlayerClicked};
        await this.setState({ pieces: pieces });
    };

    pieceWasClicked = pieceIndex => typeof this.state.pieces[pieceIndex].firstPlayerClicked != 'undefined';

    gameHasEnded = () => {
        return this.playerHasWon() || this.allPiecesWereClicked();
    };

    allPiecesWereClicked = () => {
        const { pieces } = this.state; 
        return pieces.filter(piece => typeof piece.firstPlayerClicked != 'undefined').length === pieces.length;
    }

    playerHasWon = () => {
        const playerFields  = this.state.pieces.map(piece => piece.firstPlayerClicked);
        return (
            (typeof playerFields[0] != 'undefined' && playerFields[0] === playerFields[1] && playerFields[0] === playerFields[2]) || 
            (typeof playerFields[3] != 'undefined' && playerFields[3] === playerFields[4] && playerFields[3] === playerFields[5]) ||
            (typeof playerFields[6] != 'undefined' && playerFields[6] === playerFields[7] && playerFields[6] === playerFields[8]) ||
            (typeof playerFields[0] != 'undefined' && playerFields[0] === playerFields[4] && playerFields[0] === playerFields[8]) ||
            (typeof playerFields[2] != 'undefined' && playerFields[2] === playerFields[4] && playerFields[2] === playerFields[6]) ||
            (typeof playerFields[0] != 'undefined' && playerFields[0] === playerFields[3] && playerFields[0] === playerFields[6]) ||
            (typeof playerFields[1] != 'undefined' && playerFields[1] === playerFields[4] && playerFields[1] === playerFields[7]) ||
            (typeof playerFields[2] != 'undefined' && playerFields[2] === playerFields[5] && playerFields[2] === playerFields[8])
        )
    };
}
 
export default Board;