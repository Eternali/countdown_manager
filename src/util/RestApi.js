import axios from 'axios'

export class RestApi {
  
  constructor(baseUrl = 'http://localhost:8080/') {
    this.baseUrl = baseUrl
    this.initialize()
  }

  initialize(token) {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/',
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : undefined
    })
  }

}

const api = new RestApi()

export default api
