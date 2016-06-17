import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const root = document.getElementById('app')

render(
  <AppContainer>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </AppContainer>,
  root)

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Router history={history} routes={require('./routes').default} />
        </Provider>
      </AppContainer>,
      root)
  })
}
