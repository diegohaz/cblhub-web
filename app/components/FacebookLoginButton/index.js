import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

import Button from '../Button'
import Icon, { facebook } from '../Icon'

class FacebookLoginButton extends Component {
  static propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.click = this.click.bind(this)
  }

  componentDidMount () {
    const fbRoot = document.createElement('div')
    fbRoot.id = 'fb-root'

    document.body.appendChild(fbRoot)

    if (typeof window !== 'undefined') {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: '1232038930160711',
          version: 'v2.7'
        })
      }

      ;((d, s, id) => {
        const element = d.getElementsByTagName(s)[0]
        const fjs = element
        let js = element
        if (d.getElementById(id)) { return }
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }
  }

  click () {
    if (typeof window !== 'undefined') {
      window.FB.login(({ authResponse }) => {
        if (authResponse && authResponse.accessToken) {
          this.props.onClick(authResponse.accessToken)
        }
      }, { scope: 'email' })
    }
  }

  render () {
    return (
      <Button style={[getStyle(), this.props.style]} onClick={this.click}>
        <Icon icon={facebook} style={{ marginRight: 8 }} />
        Continue with Facebook
      </Button>
    )
  }
}

const getStyle = () => ({
  backgroundColor: '#3b5998'
})

export default Radium(FacebookLoginButton)
