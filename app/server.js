import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import cookie from 'react-cookie'
import serialize from 'serialize-javascript'
import Express from 'express'
import httpsRedirect from 'express-https-redirect'
import path from 'path'
import compression from 'compression'
import { env, ip, port, root } from './config'
import routes from './routes'
import configureStore from './store/configure'
import Html from './components/Html'
import { createSession } from './store/session/session.actions'
import { StyleRoot } from 'radium'

const app = new Express()

if (env === 'production') {
  app.use(httpsRedirect())
}

app.use(compression())
app.use(Express.static(path.join(root, 'dist')))

app.use((req, res, next) => {
  cookie.setRawCookie(req.headers.cookie)
  const token = cookie.load('token')
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore({ session: { token } }, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  if (token) {
    store.dispatch(createSession())
  }

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    const fetchData = () => new Promise((resolve, reject) => {
      const { params, location, components } = renderProps
      let promises = []

      components.forEach((component) => {
        const fetch = component.fetchData ||
          component.WrappedComponent && component.WrappedComponent.fetchData
        fetch && promises.push(fetch({ params, location, store }))
      })

      Promise.all(promises)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    })

    const render = (store) => {
      const content = renderToString(
        <Provider store={store}>
          <StyleRoot radiumConfig={{ userAgent: req.headers['user-agent'] }}>
            <RouterContext {...renderProps} />
          </StyleRoot>
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

    fetchData().then(() => {
      render(configureStore(store.getState(), memoryHistory))
    }).catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on http://${ip}:${port}`)
  }
})
