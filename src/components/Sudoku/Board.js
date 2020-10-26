import React from 'react'

import Cell from './Cell'

const Board = (props) => {
  const { table, handleChange, handleClick } = props

  return (
    <div>
      {table.rows.map(row => (
        <div key={row.index}>
          {row.cols.map((cell, index) => (
            <Cell handleChange={handleChange} key={index} rowIndex={row.index} index={index} data={cell} />
          ))}
        </div>
      ))}
      <button onClick={handleClick}>GET SOLUTION NOW !!!!!!</button>
    </div>
  )
}

export default Board
