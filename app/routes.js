import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
)

export default routes
