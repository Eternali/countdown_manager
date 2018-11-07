import axios from 'axios'

const baseUrl = 'https://api.countdown_manager.com/'
let rapi = undefined

const useJwt = (token) => {
  localStorage.setItem('authToken', token)
  rapi = axios.create({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default {
  baseUrl,
  rapi,
  useJwt,
}
