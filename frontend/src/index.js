import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
const regeneratorRuntime = require("regenerator-runtime");
import Cookies from 'js-cookie'

function Square(props) {
    return (
      <button
          className="square"
          onClick={props.onClick}
      >
          {props.value}
      </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            xSquares: props.num_squares,
            squares: Array(props.num_squares).fill(null),
            xIsNext: true,
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props, state);
        if (props.num_squares !== state.xSquares) {
            return {
                xSquares: props.num_squares,
                squares: Array(props.num_squares).fill(null),
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
    }


    renderSquare(i, key) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
                key={key}
            />
        )
    }

  render() {
        console.log("Board re-render: " + this.state);
        console.log(this.state.squares);
        console.log(this.state);
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    let row = [];
    console.log("length: " + this.state.squares.length);
    for (let i = 0; i<this.state.squares.length; i++) {
        row.push(
            this.renderSquare(i, i)
        )
    }

    console.log(row);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
            {row}
          {/*{this.renderSquare(0)}*/}
          {/*{this.renderSquare(1)}*/}
          {/*{this.renderSquare(2)}*/}
        </div>
        <div className="board-row">
          {/*{this.renderSquare(3)}*/}
          {/*{this.renderSquare(4)}*/}
          {/*{this.renderSquare(5)}*/}
        </div>
        <div className="board-row">
          {/*{this.renderSquare(6)}*/}
          {/*{this.renderSquare(7)}*/}
          {/*{this.renderSquare(8)}*/}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xSquares: 9
        };
    }

    async handlePostData() {
        const data = await postData('http://localhost:8000/react', {answer: 6});
        console.log(data);
        this.setState({
            xSquares: data.num_squares
        })
    };

  render() {
      console.log("Game re-render");
    return (
      <div className="game">
        <div className="game-board">
          <Board num_squares={this.state.xSquares}/>
          <button onClick={() => this.handlePostData()}>Click Me</button>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

async function postData(url = '', data = {}) {

    var csrftoken = Cookies.get('csrftoken');

    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrftoken
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    let response2 = await response;
    console.log(response);
    return await response.json(); // parses JSON response into native JavaScript objects
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
