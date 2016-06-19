import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import HomePage from './containers/HomePage'
import LoginPage from './containers/LoginPage'
import ChallengePage from './containers/ChallengePage'
import ChallengeCreationPage from './components/ChallengeCreationPage'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/challenges/create' component={ChallengeCreationPage} />
    <Route path='/challenges/:id' component={ChallengePage} />
  </Route>
)

export default routes
