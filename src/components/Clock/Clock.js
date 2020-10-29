import React, { Fragment, useState, useEffect } from 'react'

const Clock = () => {
  const [timeString, setTimeString] = useState('')

  const formatDate = () => {
    const date = new Date()

    const hours = `0${date.getHours()}`.slice(-2)
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const seconds = `0${date.getSeconds()}`.slice(-2)

    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTimeString(formatDate())
    }, 1000)

    return () => {
      clearInterval(clockInterval)
    }
  }, [])

  return <Fragment>{timeString}</Fragment>
}

export default Clock
