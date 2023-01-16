/* eslint-disable class-methods-use-this */
import React from 'react';
import Square from './Square';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), xIsNext: true };
  }

  handleClick = (i) => {
    const { squares, xIsNext } = this.state;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({ squares: newSquares, xIsNext: !xIsNext });
  };

  renderSquare = (i) => {
    const { squares } = this.state;
    return (
      <Square
        value={squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  };

  render() {
    const { xIsNext } = this.state;
    const status = `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
