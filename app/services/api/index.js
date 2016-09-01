import axios from 'axios'
import cookie from 'react-cookie'
import { apiUrl } from '../../config'

axios.defaults.baseURL = apiUrl

axios.setToken = (token) => {
  cookie.save('token', token, { path: '/' })
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axios.unsetToken = () => {
  cookie.remove('token', { path: '/' })
  delete axios.defaults.headers.common['Authorization']
}

export default axios
