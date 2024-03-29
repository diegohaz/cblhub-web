import path from 'path'

/* istanbul ignore next */
// const requireProcessEnv = (name) => {
//   if (!process.env[name]) {
//     throw new Error('You must set the ' + name + ' environment variable')
//   }
//   return process.env[name]
// }

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..', '..'),
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 3000,
    baseUrl: 'http://192.168.25.2:3000',
    apiUrl: 'http://192.168.25.2:9000'
  },
  test: {},
  development: {},
  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    baseUrl: 'http://cblhub.diegohaz.com',
    apiUrl: 'https://cblhub-api.diegohaz.com'
  }
}

module.exports = exports = { ...config.all, ...config[config.all.env] }
export default exports
