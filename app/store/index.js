import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import localforage from 'localforage'
import api from '../services/api'
import reducers from './reducers'

const hasWindow = typeof window !== 'undefined'

const configureStore = (initialState) => {
  const finalCreateStore = compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    autoRehydrate(),
    hasWindow && window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )(createStore)

  const store = finalCreateStore(reducers, initialState)

  persistStore(store, {
    whitelist: ['session'],
    storage: localforage
  })

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStore
