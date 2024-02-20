// export default function GameBoard(){
//     return <ol id="game-board">
//         <li>
//             <ol>
//                 <li>X</li>
//                 <li>O</li>
//                 <li>X</li>
//             </ol>

//             <ol>
//                 <li>O</li>
//                 <li>X</li>
//                 <li>O</li>
//             </ol>

//             <ol>
//                 <li>X</li>
//                 <li>X</li>
//                 <li>X</li>
//             </ol>
//         </li>
//     </ol>
// }




export default function GameBoard({ onSelectSquare, board }) {
    // const [gameBoard, setGameBoard]  = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard) => {

    //         const updateBoard = [...prevGameBoard.map(innerArray =>[...innerArray])];

    //         updateBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updateBoard;
    //     });

    //     onSelectSquare();   
    // }



    return <ol id="game-board">

        {board.map((row, rowIndex) => <li key={rowIndex}>

            <ol>
                {row.map((playerSymbol, colIndex) =>
                    <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)}
                            disabled={playerSymbol !== null }
                        >{playerSymbol}</button>
                    </li>
                )}
            </ol>

        </li>)}

    </ol>
}