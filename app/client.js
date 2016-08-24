import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll'
import { StyleRoot } from 'radium'
import configureStore from './store/configure'
import routes from './routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const root = document.getElementById('app')

const renderApp = (routes) => (
  <AppContainer>
    <Provider store={store}>
      <StyleRoot radiumConfig={{ userAgent: navigator.userAgent }}>
        <Router history={history} render={applyRouterMiddleware(useScroll())} routes={routes} />
      </StyleRoot>
    </Provider>
  </AppContainer>
)

render(renderApp(routes), root)

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(renderApp(require('./routes').default), root)
  })
}
