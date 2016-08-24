import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

class Image extends Component {
  static propTypes = {
    style: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    const { image } = this.refs
    if (!image.complete) {
      image.addEventListener('load', () => this.setState({ loaded: true }))
    } else {
      this.setState({ loaded: true })
    }
  }

  render () {
    const { loaded } = this.state
    return (
      <img
        ref='image'
        {...this.props}
        style={[{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 500ms ease'
        }, this.props.style]} />
    )
  }
}

export default Radium(Image)
