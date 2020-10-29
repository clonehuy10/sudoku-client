import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = props => {
  return (
    <div className='homeBox'>
      <div className='text'>
        <h1>Game Rule</h1><br />
        The rules of Sudoku are simple: there are nine blocks, each of them has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.
      </div>

      <Link to='/sudoku'>
        <Button
          className='startButton'
          variant='default'
        >
            Start Game
        </Button>
      </Link>
    </div>
  )
}

export default Home
