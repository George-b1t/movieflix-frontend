import axios from "axios"

const api = axios.create({
  baseURL: 'http://192.168.145.35:8080'
})

export { api }
