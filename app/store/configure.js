import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import api from '../services/api'
import reducers from './'

const hasWindow = typeof window !== 'undefined'

const configureStore = (initialState, history) => {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk.withExtraArgument(api),
      routerMiddleware(history)
    ),
    hasWindow && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore)

  const store = finalCreateStore(reducers, initialState)

  if (module.hot) {
    module.hot.accept('./', () => {
      const nextReducer = require('./').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
