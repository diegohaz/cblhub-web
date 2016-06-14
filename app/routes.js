import React from 'react'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import PageLayout from './components/PageLayout'
import Home from './components/Home'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={PageLayout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
)

export default routes
