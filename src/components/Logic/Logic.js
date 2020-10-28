import React, { Fragment } from 'react'

export const arrayToObject = (board, solution) => {
  const result = { rows: [] }

  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i }
    for (let j = 0; j < 9; j++) {
      const value = board[i * 9 + j]
      let doubleCheck = false

      if (value === solution[i * 9 + j]) {
        doubleCheck = true
      }

      const col = {
        row: i,
        col: j,
        value: value,
        readonly: doubleCheck
      }
      row.cols.push(col)
    }
    result.rows.push(row)
  }

  return result
}

export const objectToArray = (board) => {
  const result = []

  board.rows.forEach(row => {
    row.cols.forEach(col => {
      col.value === null ? result.push(col.value) : result.push(col.value)
    })
  })

  return result
}

export const checkSolution = (table, solved) => {
  const check = table.rows.every(row => {
    return row.cols.every(col => {
      return col.value === solved[col.row * 9 + col.col]
    })
  })

  return check
}

export const timeConvert = time => {
  const hours = `0${Math.floor(time / 3600)}`.slice(-2)
  const minutes = `0${Math.floor(time / 60)}`.slice(-2)
  const seconds = `0${time % 60}`.slice(-2)

  return <Fragment>{hours}:{minutes}:{seconds}</Fragment>
}

// export const forViewOnly = (board) => {
//   const result = { rows: [] }

//   for (let i = 0; i < 9; i++) {
//     const row = { cols: [], index: i }
//     for (let j = 0; j < 9; j++) {
//       const value = board[i * 9 + j]

//       const col = {
//         row: i,
//         col: j,
//         value: value,
//         readonly: true
//       }
//       row.cols.push(col)
//     }
//     result.rows.push(row)
//   }

//   return result
// }
