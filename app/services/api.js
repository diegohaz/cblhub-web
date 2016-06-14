import axios from 'axios'
import { env } from '../config'

axios.defaults.baseURL = env === 'production'
  ? 'https://cblhub-api.diegohaz.com'
  : 'http://localhost:9000'

export default axios
