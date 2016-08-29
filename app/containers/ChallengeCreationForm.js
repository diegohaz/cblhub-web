import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { push } from 'react-router-redux'
import { createChallenge, fromUser } from '../store'
import { createValidator, required, maxLength } from '../services/validation'
import ChallengeCreationForm from '../components/ChallengeCreationForm'

class ChallengeCreationFormContainer extends Component {
  render () {
    return <ChallengeCreationForm onSubmit={onSubmit} {...this.props} />
  }
}

const validate = createValidator({
  bigIdea: [required, maxLength(48)],
  essentialQuestion: [required, maxLength(96)],
  title: [required, maxLength(96)],
  description: [maxLength(2048)]
})

const onSubmit = (body, dispatch, { user }) => {
  if (!user) {
    return dispatch(push('/login?back=/challenges/create&warn'))
  }
  return dispatch(createChallenge(body)).then(() => {
    console.log('created')
  }, ({ status }) => {
    const error = { _error: 'A unknown error occurred. Please try again later.' }
    throw error
  })
}

const mapStateToProps = (state) => ({
  user: fromUser.getCurrentUser(state)
})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'challengeCreation',
  fields: ['bigIdea', 'essentialQuestion', 'title', 'description'],
  destroyOnUnmount: false,
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(ChallengeCreationFormContainer)
