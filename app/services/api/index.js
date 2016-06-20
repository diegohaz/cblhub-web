import axios from 'axios'
import Promise from 'bluebird'
import cookie from 'react-cookie'
import { apiUrl } from '../../config'

const token = cookie.load('token')

axios.defaults.baseURL = apiUrl

// axios.interceptors.response.use(
//   (config) => Promise.resolve(config).delay(1000),
//   (err) => Promise.reject(err)
// )

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios
