import React from 'react'

import Clock from '../Clock/Clock'

const Home = props => {
  return (
    <div className='container clockBox'>
      <div className='row clock'><Clock /></div>
      <div className='row text'>The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.</div>
    </div>
  )
}

export default Home
