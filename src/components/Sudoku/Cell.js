import React from 'react'

const Cell = props => {
  const { index, rowIndex, data, handleChange, msgAlert } = props

  let jsx = ''

  if (index === 2 || index === 5) {
    (rowIndex === 2 || rowIndex === 5 ? jsx = 'cell cellRight cellBottom' : jsx = 'cell cellRight')
  } else if (rowIndex === 2 || rowIndex === 5) {
    jsx = 'cell cellBottom'
  } else {
    jsx = 'cell'
  }

  if (data.readonly) {
    jsx += ' given'
  } else {
    jsx += ' userInput'
  }

  const handleOnChange = e => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value)
    handleChange({ ...data, value: value })
  }

  const handleKeyPress = e => {
    if (!['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
      msgAlert({
        heading: 'Invalid Move',
        message: 'Only number from 1 to 9 is available for Sudoku.',
        variant: 'danger'
      })
    }
  }

  return (
    <input
      type='text'
      maxLength={1}
      pattern={[0 - 9]}
      className={jsx}
      value={data.value ? data.value : ''}
      disabled={data.readonly}
      onChange={handleOnChange}
      onKeyPress={handleKeyPress} />
  )
}

export default Cell
