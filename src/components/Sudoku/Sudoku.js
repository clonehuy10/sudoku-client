import React, { Fragment, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import Board from './Board'
import { createGame, updateGame, deleteGame } from '../../api/game'
import Timer from '../Timer/Timer'

import generator from 'sudoku'
// makepuzzle, solvepuzzle, ratepuzzle

// functions from Logic folder
import { arrayToObject, objectToArray, checkSolution } from '../Logic/Logic'

const Sudoku = props => {
  const [table, setTable] = useState({
    rows: []
  })
  const [gameApi, setGameApi] = useState(null)
  const [solution, setSolution] = useState([])
  const [magic, setMagic] = useState(false)

  // run once when component mounts
  useEffect(() => {
    // generate sudoku table and its solution
    // add 1 to each number because they use 0-8 instead of 1-9
    const getTable = generator.makepuzzle()
    const modifiedTable = getTable.map(x => x === null ? null : x + 1)
    const getSolution = generator.solvepuzzle(getTable)
    const modifiedSolution = getSolution.map(x => x + 1)

    setTable(arrayToObject(modifiedTable, modifiedSolution))
    setSolution(modifiedSolution)

    // make api call to create the table
    // *******************************
    createGame(modifiedTable, modifiedSolution, props.user)
      .then(res => setGameApi(res.data.game))
      .then(() => props.msgAlert({
        heading: 'Create Game Success',
        message: 'A new game has been created',
        variant: 'success'
      }))
      .catch(error => props.msgAlert({
        heading: 'Create Game Failure',
        message: 'Error: ' + error,
        variant: 'danger'
      }))
  }, [])

  useEffect(() => {
    if (gameApi !== null && !magic) {
      updateGame(objectToArray(table), gameApi, props.user)
    }
  }, [gameApi])

  // play the game
  const handleChange = e => {
    // copy the current table
    const copy = Object.assign({}, table)

    // update the table with the copy
    copy.rows[e.row].cols[e.col].value = e.value
    setTable(copy)

    // if the board has been completed, check solution
    if (!objectToArray(table).includes(null)) {
      // check if the game is over or not
      if (checkSolution(table, solution)) {
        // winning message
        setGameApi({ ...gameApi, over: true })
        props.msgAlert({
          heading: 'Congratulation',
          message: 'You have successful completed the game.',
          variant: 'success'
        })
      }
    } else {
      // make api call to update the table
      // *******************************
      updateGame(objectToArray(table), gameApi, props.user)
    }
  }

  // function for timer
  const handleTime = number => {
    setGameApi({ ...gameApi, time: number })
  }

  // Get the solution
  const handleClick = e => {
    setTable(arrayToObject(solution, solution))

    setMagic(true)

    // send message that the board has been completed by magic
    deleteGame(gameApi._id, props.user)
      .then(() => props.msgAlert({
        heading: 'Try again next time',
        message: 'The board has been competed for you. It is also removed from your history.',
        variant: 'success'
      }))
      .catch(() => props.msgAlert({
        heading: 'Try again next time',
        message: 'The board has been competed for you. It is also removed from your history.',
        variant: 'danger'
      }))

    setGameApi({ ...gameApi, over: true })
  }

  // stop the render if table and gameApi is not loaded
  if (table.rows.length === 0 || gameApi === null) {
    return ''
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
        msgAlert={props.msgAlert}
        handleChange={handleChange}
        table={table} />
      <div className='col-12 solveBox'>
        {gameApi.over
          ? <Fragment>
            <Link to='/history'>
              <Button
                className='solveButton'
                variant='default'>
                View History
              </Button>
            </Link>

            <Link to='/home'>
              <Button
                className='solveButton'
                variant='default'>
                Back to Home
              </Button>
            </Link>
          </Fragment>
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

export default Sudoku
