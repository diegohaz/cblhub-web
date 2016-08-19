import axios from 'axios'
import cookie from 'react-cookie'
import { apiUrl } from '../../config'

axios.defaults.baseURL = apiUrl

const token = cookie.load('token', { path: '/' })

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.setToken = (token, save = true) => {
  cookie.save('token', token, { path: '/' })
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.unsetToken = () => {
  cookie.remove('token', { path: '/' })
  axios.defaults.headers.common['Authorization'] = undefined
}

export default axios
