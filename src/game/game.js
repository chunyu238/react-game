import React from 'react';
import Board from '../board/board.js';
import './game.css';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status:'X',
            board:['','','','','','','','',''],
            winnerFound: false,
            boardHistory:[['','','','','','','','','']],
            step: 1}
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        if(this.state.board[i].length === 0 && !this.state.winnerFound){
            let copyBoard = this.state.board.slice();
            let currHistory = this.state.boardHistory.slice();
            let currStep = this.state.step;
            currStep++;
            copyBoard[i] =this.state.status;
            if(currHistory.length <= currStep){
                currHistory.push(copyBoard);
            }else{
                currHistory[currStep] = copyBoard;
            }

            if(checkWinner(copyBoard)){
                this.setState({
                    winnerFound: true,
                    board: copyBoard,
                    boardHistory: currHistory,
                    step: currStep
                });
            }else{
                this.setState(state => ({
                    status: state.status === 'X' ? 'O' : 'X',
                    board: copyBoard,
                    boardHistory: currHistory,
                    step: currStep
                }));
            }
        }
    }

    jumpTo(step) {
        let status = step % 2 === 1 ? 'O' : 'X';
        let newBoard = this.state.boardHistory[step];
        this.setState({
            board: newBoard, 
            status: status,
            step: step
        });
      }

    render() {
        let gameInfoPrefix =  "Next player: ";
        const history = this.state.boardHistory;
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        if(this.state.winnerFound){
            gameInfoPrefix = "Winner: ";
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board changeStatus={(i) => this.handleClick(i)} board={this.state.board}/>
                </div>
                <div className="game-info">
                    <div>{gameInfoPrefix}{this.state.status}</div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

function checkWinner(currentBoard){
    const winningCombos = [ [0,1,2],
                            [3,4,5],
                            [6,7,8],
                            [0,3,6],
                            [1,4,7],
                            [2,5,8],
                            [0,4,8],
                            [2,4,6] ];
    for(let i=0;i<winningCombos.length;i++){
        if(currentBoard[winningCombos[i][0]].length > 0 
            && currentBoard[winningCombos[i][0]] === currentBoard[winningCombos[i][1]]
            && currentBoard[winningCombos[i][0]] === currentBoard[winningCombos[i][2]]){
                return true;
            }
    }
    return false;
}

export default Game;