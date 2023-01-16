import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import _ from 'lodash';
import Board from './Board';
import calculateWinner from './calculateWinner';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick = (i) => {
    const { history, xIsNext, stepNumber } = this.state;
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: currentHistory.concat([{
        squares,
      }]),
      stepNumber: currentHistory.length,
      xIsNext: !xIsNext,
    });
  };

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  };

  render() {
    const { history, xIsNext, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const description = move
        ? `Go to move # ${move}` : 'Go to game start';
      return (
        <li key={_.uniqueId()}>
          <button type="button" onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `"${winner}" has won`;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);
