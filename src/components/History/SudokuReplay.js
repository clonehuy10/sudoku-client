import React, { useState } from 'react'

import Board from '../Sudoku/Board'
import { updateGame } from '../../api/game'
import { arrayToObject, objectToArray, checkSolution } from '../Logic/Logic'

const SudokuReplay = props => {
  const { game, user, msgAlert } = props.location.state

  const [gameApi, setGameApi] = useState(props.location.state.game)
  const [table, setTable] = useState(arrayToObject(game.table, game.solution))

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
        setGameApi({ over: true })
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

  return (
    <div>
      <Board
        msgAlert={msgAlert}
        handleChange={handleChange}
        table={table} />
    </div>
  )
}

export default SudokuReplay
