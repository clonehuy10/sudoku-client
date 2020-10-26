import React, { useState, useEffect } from 'react'

import Board from './Board'

import generator from 'sudoku'
// makepuzzle, solvepuzzle, ratepuzzle

// functions from Logic folder
import { arrayToObject } from './Logic/arrayToObject'
import { objectToArray } from './Logic/objectToArray'

const Sudoku = () => {
  const [table, setTable] = useState({
    rows: []
  })

  // generate sudoku table and its solution
  const [raw, setRaw] = useState(generator.makepuzzle())
  const solved = generator.solvepuzzle(raw)

  useEffect(() => {
    const convert = arrayToObject(raw)
    setTable(convert)
  }, [raw])

  const handleChange = e => {
    // copy the current table
    const copy = Object.assign({}, table)

    // update the table with the copy
    copy.rows[e.row].cols[e.col].value = e.value
    setTable(copy)

    // check if the game is over or not
    if (checkSolution()) {
      console.log('Niceee')
    } else {
      console.log('Nooooo')
    }
  }

  const handleClick = e => {
    setRaw(solved)
  }

  const checkSolution = () => {
    const convertSolved = solved.map(x => x + 1)

    const check = table.rows.every(row => {
      return row.cols.every(col => {
        return col.value === convertSolved[col.row * 9 + col.col]
      })
    })

    return check
  }

  return (
    <div>
      <Board
        handleChange={handleChange}
        handleClick={handleClick}
        table={table} />
    </div>
  )
}

export default Sudoku
