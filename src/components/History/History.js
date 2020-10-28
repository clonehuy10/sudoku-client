import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Board from '../Sudoku/Board'
import { forViewOnly } from '../Logic/Logic'
import { showGame, deleteGame } from '../../api/game'

const History = props => {
  // data is an array of OBJECTS
  const [data, setData] = useState([])

  useEffect(() => {
    showGame(props.user)
      .then(res => setData(res.data.games))
      .then(() => props.msgAlert({
        heading: 'View Games Success',
        message: 'Successful loaded all your games',
        variant: 'success'
      }))
      .catch(error => props.msgAlert({
        heading: 'View Games Failure',
        message: 'Error: ' + error,
        variant: 'danger'
      }))
  }, [])

  const handleDelete = e => {
    const value = e.target
    deleteGame(value.id, props.user)
      .then(() => props.msgAlert({
        heading: 'Delete Game Success',
        message: 'Successful deleted your games',
        variant: 'success'
      }))
      .then(() => {
        const theOne = data.findIndex(game => game._id === value.id)
        const copy = data.slice()
        copy.splice(theOne, 1)

        setData(copy)
      })
      .catch(error => props.msgAlert({
        heading: 'Delete Game Failure',
        message: 'Error: ' + error,
        variant: 'danger'
      }))
  }

  return (
    <div>
      {data.map(game => (
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
            }}>Keep Playing This Board</Link>}
        </div>
      ))}
    </div>
  )
}

export default History
