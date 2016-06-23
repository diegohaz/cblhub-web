import axios from 'axios'
import cookie from 'react-cookie'
import { apiUrl } from '../../config'

const token = cookie.load('token')

axios.defaults.baseURL = apiUrl

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios
