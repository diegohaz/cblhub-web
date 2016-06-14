import axios from 'axios'
import { env } from '../config'

export const url = env === 'production'
  ? 'https://cblhub-api.diegohaz.com'
  : 'http://localhost:9000'

axios.defaults.baseURL = url

export default axios
