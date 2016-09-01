import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

import Dialog from '../Dialog'
import FormControl from '../FormControl'
import Button from '../Button'

class PasswordResetRequestForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit (...args) {
    return this.props.handleSubmit(...args).then(() => {
      this.setState({ submitted: true })
    })
  }

  render () {
    const { fields: { email }, submitting, error } = this.props
    const { submitted } = this.state
    return (
      <form onSubmit={this.submit}>
        {submitted && !error && <Dialog type="success">Email was sent succesfully.</Dialog>}
        {error && <Dialog type="error">{error}</Dialog>}
        <FormControl type="email" label="E-mail" field={email} />
        <Button type="submit" disabled={submitting}>Send</Button>
      </form>
    )
  }
}

export default Radium(PasswordResetRequestForm)
