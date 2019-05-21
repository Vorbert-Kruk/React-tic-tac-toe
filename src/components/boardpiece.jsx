import React, { Component } from 'react';
import '../styles/boardpiece.css';

class BoardPiece extends Component {
    render() { 
        const { handleClick, pieceIndex} = this.props;
        return ( 
            <div className={this.changePieceSign()} onClick={() => {handleClick(pieceIndex)}}>
                
            </div>
         );
    }
    
    changePieceSign = () => {
        const { firstPlayerClicked } = this.props;
        return `board-piece ${(
            typeof firstPlayerClicked != 'undefined' ?
                (
                    firstPlayerClicked ? 'circle' : 'cross'    
                ) :
                ''
        )}`
    };
}
 
export default BoardPiece;