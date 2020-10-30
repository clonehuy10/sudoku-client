import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import { timeConvert } from '../Logic/Logic'
// import Board from '../Sudoku/Board'
// import { forViewOnly } from '../Logic/Logic'

import Table from 'react-bootstrap/Table'

const DataOnCurrentPage = props => {
  const { currentData, handleDelete, user, msgAlert } = props

  const convertTimestamp = string => {
    const year = string.slice(0, 4)
    const month = string.slice(5, 7)
    const day = string.slice(8, 10)

    return <Fragment>{month}-{day}-{year}</Fragment>
  }

  // Table: StartDate, TimeSpent, Solved?, Action
  return (
    <Fragment>
      <Table className='historyTable' striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>Time Spent</th>
            <th>Solved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(game => (
            <tr key={game._id}>
              <td>{convertTimestamp(game.createdAt)}</td>
              <td>{timeConvert(game.time)}</td>
              <td>{game.over ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  id={game._id}
                  variant='danger'
                  onClick={handleDelete}>
                  Delete
                </Button>

                {game.over
                  ? ''
                  : <Link to={{
                    pathname: '/sudokuReplay',
                    state: {
                      game: game,
                      user: user,
                      msgAlert: msgAlert
                    }
                  }}>
                    <Button className='ml-2' variant='info'>Keep Playing</Button>
                  </Link>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* {currentData.map(game => (
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
                user: user,
                msgAlert: msgAlert
              }
            }}><button>Keep Playing</button></Link>}
        </div>
      ))} */}
    </Fragment>
  )
}

export default DataOnCurrentPage
