import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Board from '../Sudoku/Board'
import { forViewOnly } from '../Logic/Logic'

const DataOnCurrentPage = props => {
  const { currentData, handleDelete } = props

  return (
    <Fragment>
      {currentData.map(game => (
        <div key={game._id}>
          <Board
            msgAlert={props.msgAlert}
            table={forViewOnly(game.table)} />
          <button id={game._id} onClick={handleDelete}>Delete</button>
          {game.over
            ? ''
            : <Link to={{
              pathname: '/sudokuReplay',
              state: {
                game: game,
                user: props.user,
                msgAlert: props.msgAlert
              }
            }}><button>Keep Playing</button></Link>}
        </div>
      ))}
    </Fragment>
  )
}

export default DataOnCurrentPage
