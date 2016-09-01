import { reduxForm, reset } from 'redux-form'
import { push } from 'react-router-redux'
import { createChallenge, searchPhotos, updateChallenge, selectPhoto, fromUser } from '../store'
import { createValidator, required, maxLength } from '../services/validation'
import ChallengeCreationForm from '../components/ChallengeCreationForm'

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
  let challenge, photo
  return dispatch(createChallenge(body)).then((c) => {
    reset('challengeCreation')
    challenge = c
    return dispatch(searchPhotos({ q: challenge.bigIdea }))
  }).then(([ p ]) => {
    photo = p
    return p ? dispatch(updateChallenge({ id: challenge.id, photo: p.id })) : null
  }).then(() => {
    return dispatch(push(`/challenges/${challenge.id}`))
  }).then(() => {
    return dispatch(searchPhotos({ q: challenge.bigIdea, limit: 50 }))
  }).then(() => {
    return photo ? dispatch(selectPhoto(photo.id)) : null
  }).catch(({ response }) => {
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
}, mapStateToProps, mapDispatchToProps)(ChallengeCreationForm)
