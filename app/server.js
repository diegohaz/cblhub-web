import Express from 'express'
import path from 'path'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import httpsRedirect from 'express-https-redirect'
import compression from 'compression'
import { env, ip, port, root } from './config'
import routes from './routes'
import configureStore from './store'
import Html from './components/Html'

const app = new Express()
const store = configureStore()

if (env === 'production') {
  app.use(httpsRedirect())
}

app.use(compression())
app.use(Express.static(path.join(root, 'dist')))

app.use((req, res, next) => {
  match({ routes, location: req.path }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    const content = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
    const initialState = store.getState()
    const assets = webpackIsomorphicTools.assets()
    const state = `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`
    const markup = <Html assets={assets} state={state} content={content} />
    const doctype = '<!doctype html>\n'
    const html = renderToStaticMarkup(markup)

    res.send(doctype + html)
  })
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`Listening on http://${ip}:${port}`)
  }
})
