import React, { useState, useEffect } from 'react'

import DataOnCurrentPage from '../Pagination/DataOnCurrentPage'
import { showGame, deleteGame } from '../../api/game'
import Pagination from '../Pagination/Pagination'

const History = props => {
  // data is an array of OBJECTS
  const [data, setData] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  useEffect(() => {
    showGame(props.user)
      .then(res => setData(res.data.games.reverse()))
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

  const handlePaginate = number => {
    setCurrentPage(number)
  }

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentData = data.slice(indexOfFirst, indexOfLast)
  console.log('data', data)
  return (
    <div className='container'>
      <DataOnCurrentPage
        currentData={currentData}
        handleDelete={handleDelete}
        user={props.user}
        msgAlert={props.msgAlert}
      />
      <Pagination
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems={data.length}
        paginate={handlePaginate}
      />
    </div>
  )
}

export default History

// {data.map(game => (
//   <div key={game._id}>
//     <Board
//       msgAlert={props.msgAlert}
//       table={forViewOnly(game.table)} />
//     <button id={game._id} onClick={handleDelete}>Delete</button>
//     {game.over
//       ? ''
//       : <Link to={{
//         pathname: '/sudokuReplay',
//         state: {
//           game: game,
//           user: props.user,
//           msgAlert: props.msgAlert
//         }
//       }}><button>Keep Playing</button></Link>}
//   </div>
// ))}
