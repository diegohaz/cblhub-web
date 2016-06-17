import { reduxForm } from 'redux-form'
import { createSession } from '../store/session/session.actions'
import { fetchMe } from '../store/user/user.actions'
import { createValidator, required, email, minLength } from '../services/validation'
import LoginForm from '../components/LoginForm'

const validate = createValidator({
  email: [required, email],
  password: [required, minLength(6)]
})

const onSubmit = ({ email, password }, dispatch) =>
  dispatch(createSession(email, password)).then(() => {
    return dispatch(fetchMe())
  }, ({ status }) => {
    let error = {}
    if (status === 401) {
      error = { _error: 'Wrong email or password' }
    } else {
      error = { _error: 'A unknown error occurred. Please try again later.' }
    }
    throw error
  })

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate,
  onSubmit
}, mapStateToProps, mapDispatchToProps)(LoginForm)
