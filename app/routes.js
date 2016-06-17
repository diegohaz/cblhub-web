import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Layout from './components/Layout'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'

const routes = (
  <Route path='/' component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path='/login' component={LoginPage} />
  </Route>
)

export default routes
