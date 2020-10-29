import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Board from '../Sudoku/Board'
import { updateGame, deleteGame } from '../../api/game'
import { arrayToObject, objectToArray, checkSolution } from '../Logic/Logic'
import Timer from '../Timer/Timer'

const SudokuReplay = props => {
  const { game, user, msgAlert } = props.location.state

  const [gameApi, setGameApi] = useState(props.location.state.game)
  const [table, setTable] = useState(arrayToObject(game.table, game.solution))
  const [magic, setMagic] = useState(false)

  useEffect(() => {
    if (gameApi !== null && !magic) {
      updateGame(objectToArray(table), gameApi, user)
    }
  }, [gameApi])

  const handleChange = e => {
    // copy the current table
    const copy = Object.assign({}, table)

    // update the table with the copy
    copy.rows[e.row].cols[e.col].value = e.value
    setTable(copy)

    // if the board has been completed, check solution
    if (!objectToArray(table).includes(null)) {
      // check if the game is over or not
      if (checkSolution(table, game.solution)) {
        // winning message
        setGameApi({ ...gameApi, over: true })
        msgAlert({
          heading: 'Congratulation',
          message: 'You have successful completed the game.',
          variant: 'success'
        })
      }
    }

    // // make api call to update the table
    // // *******************************
    updateGame(objectToArray(table), gameApi, user)
  }

  // function for timer
  const handleTime = number => {
    setGameApi({ ...gameApi, time: number })
  }

  // Get the solution
  const handleClick = e => {
    setTable(arrayToObject(gameApi.solution, gameApi.solution))

    setMagic(true)

    // send message that the board has been completed by magic
    deleteGame(gameApi._id, user)
      .then(() => msgAlert({
        heading: 'Try again next time',
        message: 'The board has been competed for you. It is also removed from your history.',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Try again next time',
        message: 'The board has been competed for you. It is also removed from your history.',
        variant: 'danger'
      }))

    setGameApi({ ...gameApi, over: true })
  }

  return (
    <div className='row gameBoard'>
      <div className='col-12 timer'>
        {!gameApi.over &&
          <Timer
            gameApi={gameApi}
            handleTime={handleTime} />}
      </div>
      <Board
        msgAlert={msgAlert}
        handleChange={handleChange}
        table={table} />
      <div className='col-12 solveBox'>
        {gameApi.over
          ? <Link to='/history'>
            <Button
              className='solveButton'
              variant='default'>
              Back to History
            </Button>
          </Link>
          : <Button
            className='solveButton'
            variant='default'
            onClick={handleClick}>
            Give Up!
          </Button>}
      </div>
    </div>
  )
}

export default SudokuReplay
