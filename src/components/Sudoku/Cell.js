import React from 'react'

const Cell = props => {
  const { index, rowIndex, data, handleChange } = props

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
    if (value > 9) {
      return
    }
    handleChange({ ...data, value: value })
  }

  return (
    <input
      type='number'
      max='9'
      className={jsx}
      value={data.value ? data.value : ''}
      disabled={data.readonly}
      onChange={handleOnChange} />
  )
}

export default Cell

// const handleKeyPress = e => {
//   if (e.key === 'Enter') {
//     console.log('A')
//   } else {
//     console.log('B')
//   }
// }

// onKeyPress={handleKeyPress}
