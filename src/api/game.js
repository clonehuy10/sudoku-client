import apiUrl from '../apiConfig'
import axios from 'axios'

export const createGame = (table, solution, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/games',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      game: {
        table: table,
        solution: solution
      }
    }
  })
}

export const updateGame = (table, gameApi, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/games/' + gameApi._id,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      game: {
        table: table,
        over: gameApi.over
      }
    }
  })
}

export const showGame = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/games',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteGame = (gameId, user) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/games/' + gameId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
