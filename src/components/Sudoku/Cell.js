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
  }

  const handleOnChange = e => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value)
    handleChange({ ...data, value: value })
  }

  return (
    <input
      type='text'
      maxLength={1}
      pattern={[0 - 9]}
      className={jsx}
      value={data.value ? data.value : ''}
      disabled={data.readonly}
      onChange={handleOnChange} />
  )
}

export default Cell
