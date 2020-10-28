import React, { useEffect } from 'react'

import { timeConvert } from '../Logic/Logic'

const Timer = props => {
  const { gameApi, handleTime } = props

  useEffect(() => {
    if (gameApi === null) {
      return
    }
    const timer = setInterval(() => {
      const newTime = gameApi.time + 1
      handleTime(newTime)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [gameApi])

  return (
    <h4>{timeConvert(gameApi.time)}</h4>
  )
}

export default Timer
