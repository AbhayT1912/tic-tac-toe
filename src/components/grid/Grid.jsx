import { useState } from 'react'
import Card from '../cards/Card'
import './Grid.css';
import isWinner from '../../helpers/checkWinner'
function Grid ({ numberofCards }) {
  const [board, setBoard] = useState(Array(numberofCards).fill(''))
  const [turn, setTurn] = useState(true)   // true = O, false = X
  const [winner, setWinner] = useState(null)
  function play (index) {
    if(turn == true){
      board[index] = 'O';
    } else{
      board[index] = 'X';
    }
    const win = isWinner(board, (turn)? 'O' : 'X')
    if (win) {
      setWinner(win);
    }
    setBoard([...board])
    setTurn(!turn)
  }

  function restart(){
    setTurn(true)
    setWinner(null)
    setBoard(Array(numberofCards).fill(''))
  }

  return (
    <div className ="grid-wrapper">
      {
        winner && (
          <>
            <h1 className='turn-highlight'>Winner is : {winner}</h1>
            <button className='reset' onClick={restart}>Restart Game</button>
          </>
        )
      }
      <h1 className='turn-heighlight'>Current turn : {(turn)? 'O' : 'X'}</h1>
      <div className='grid'>
        {board.map((ele, index) => (
          <Card gameEnd ={winner ? true : false}  key={index}  onPlay ={play} player = {ele} index ={index} />
        ))}
      </div>
    </div>
  )
}

export default Grid
