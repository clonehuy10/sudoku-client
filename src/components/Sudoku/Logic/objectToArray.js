export const objectToArray = (board) => {
  const result = []

  board.rows.forEach(row => {
    row.cols.forEach(col => {
      col.value === null ? result.push(col.value) : result.push(col.value - 1)
    })
  })

  return result
}
