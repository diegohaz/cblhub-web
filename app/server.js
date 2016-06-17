import Express from 'express'
import path from 'path'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import httpsRedirect from 'express-https-redirect'
import compression from 'compression'
import { env, ip, port, root } from './config'
import serialize from 'serialize-javascript'
import routes from './routes'
import configureStore from './store'
import cookie from 'react-cookie'
import Html from './components/Html'
import { createSession } from './store/session/session.actions'
import { fetchMe } from './store/user/user.actions'

const app = new Express()

if (env === 'production') {
  app.use(httpsRedirect())
}

app.use(compression())
app.use(Express.static(path.join(root, 'dist')))

app.use((req, res, next) => {
  cookie.setRawCookie(req.headers.cookie)
  const token = cookie.load('token')
  const memoryHistory = createMemoryHistory(req.path)
  const store = configureStore({ session: { token } }, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    if (token) {
      store.dispatch(createSession())
      store.dispatch(fetchMe()).then(() => {
        render(res, store, renderProps)
      })
    } else {
      render(res, store, renderProps)
    }
  })
})

const render = (res, store, renderProps) => {
  const content = renderToString(
    <Provider store={store}>
      <RouterContext { ...renderProps } />
    </Provider>
  )

  const initialState = store.getState()
  const assets = webpackIsomorphicTools.assets()
  const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`
  const markup = <Html assets={assets} state={state} content={content} />
  const doctype = '<!doctype html>\n'
  const html = renderToStaticMarkup(markup)

  res.send(doctype + html)
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on http://${ip}:${port}`)
  }
})
