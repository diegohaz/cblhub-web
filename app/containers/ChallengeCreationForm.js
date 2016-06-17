import { reduxForm } from 'redux-form'
import { createChallenge } from '../store/challenge/challenge.actions'
import { createValidator, required, maxLength } from '../services/validation'
import ChallengeCreationForm from '../components/ChallengeCreationForm'

const validate = createValidator({
  bigIdea: [required, maxLength(48)],
  essentialQuestion: [required, maxLength(96)],
  title: [required, maxLength(96)],
  description: [maxLength(2048)]
})

const onSubmit = (body, dispatch) =>
  dispatch(createChallenge(body)).then(() => {
    console.log('created')
  }, ({ status }) => {
    const error = { _error: 'A unknown error occurred. Please try again later.' }
    throw error
  })

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'challengeCreation',
  fields: ['bigIdea', 'essentialQuestion', 'title', 'description'],
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(ChallengeCreationForm)
