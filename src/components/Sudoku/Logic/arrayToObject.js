export const arrayToObject = (board) => {
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
