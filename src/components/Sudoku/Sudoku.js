import React, { useState, useEffect } from 'react'

import Board from './Board'

import generator from 'sudoku'
// makepuzzle, solvepuzzle, ratepuzzle

const Sudoku = () => {
  const [table, setTable] = useState({
    rows: []
  })
  // generate sudoku table and its solution
  const [raw, setRaw] = useState(generator.makepuzzle())
  const solved = generator.solvepuzzle(raw)

  const convert = (board) => {
    const result = { rows: [] }

    for (let i = 0; i < 9; i++) {
      const row = { cols: [], index: i }
      for (let j = 0; j < 9; j++) {
        let value = board[i * 9 + j]
        if (value !== null) {
          value += 1
        }
        const col = {
          row: i,
          col: j,
          value: value,
          readonly: value !== null
        }
        row.cols.push(col)
      }
      result.rows.push(row)
    }

    return result
  }

  useEffect(() => {
    const result = convert(raw)
    setTable(result)
    console.log(solved)
  }, [raw])

  const handleChange = e => {
    const copy = Object.assign({}, table)

    copy.rows[e.row].cols[e.col].value = e.value
    setTable(copy)
  }

  const handleClick = e => {
    setRaw(solved)
  }

  const handleCheck = () => {
    const convertSolved = solved.map(x => x + 1)

    const check = table.rows.every(row => {
      return row.cols.every(col => {
        return col.value === convertSolved[col.row * 9 + col.col]
      })
    })

    if (check) {
      console.log('Niceee')
    } else {
      console.log('Nooooo')
    }
  }

  return (
    <div>
      <Board
        handleChange={handleChange}
        handleClick={handleClick}
        handleCheck={handleCheck}
        table={table} />
    </div>
  )
}

export default Sudoku
