import React, { useState, useEffect } from 'react'

import Board from './Board'

import generator from 'sudoku'
// makepuzzle, solvepuzzle, ratepuzzle

const Sudoku = () => {
  const [table, setTable] = useState({
    rows: []
  })
  const [raw, setRaw] = useState([])
  const [solved, setSolved] = useState([])

  useEffect(() => {
    // generate sudoku table and its solution
    const rawTable = generator.makepuzzle()
    const solvedTable = generator.solvepuzzle(rawTable)
    const result = { rows: [] }

    for (let i = 0; i < 9; i++) {
      const row = { cols: [], index: i }
      for (let j = 0; j < 9; j++) {
        let value = rawTable[i * 9 + j]
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

    setRaw(rawTable)
    setSolved(solvedTable)
    setTable(result)
  }, [])

  const handleChange = e => {
    console.log(table)
    console.log(raw)
    console.log(solved)
    const copy = Object.assign({}, table)

    copy.rows[e.row].cols[e.col].value = e.value
    setTable(copy)
  }

  return (
    <div>
      <Board handleChange={handleChange} table={table} />
    </div>
  )
}

export default Sudoku
