import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from './components/GameOver'

import { WINNING_COMBINATIONS } from "./winning-combinations";


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];



function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(
    {
      'X': 'Player 1',
      '0': 'Player 2'
    }
  )
  const [gameTurns, setGameTurns] = useState([]);
  console.log("GAME TURNS: ", gameTurns);
  //const [activePlayer, setActivePlayer] = useState('X');
  //const [hasWinner, setHaswinner] = useState(false);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  console.log("GAME TURNS: ", gameTurns);

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }

  }

  const hasDraw = gameTurns.length === 9 && (!winner);

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    }));
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName //here I am just overwriting the symbol of the player that was changed
      }
    });
  }

  return <main>
    <div id="game-container" className="highlight-player">
      <ol id="players">

        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}></Player>
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}></Player>
      </ol>

      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}></GameOver>}

      <GameBoard onSelectSquare={handleSelectSquare}
        //activePlayerSymbol={activePlayer}
        // turns={gameTurns}
        board={gameBoard}
      ></GameBoard>
    </div>

    <Log turns={gameTurns}></Log>
  </main>

}

export default App
