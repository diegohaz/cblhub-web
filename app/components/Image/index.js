import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

class Image extends Component {
  static propTypes = {
    style: PropTypes.object
  }

  componentDidMount () {
    const { image } = this.refs
    if (!image.complete) {
      this.setState({ loaded: false })
      image.addEventListener('load', () => this.setState({ loaded: true }))
    }
  }

  render () {
    const { loaded } = this.state
    return (
      <img
        ref='image'
        style={[{
          opacity: typeof loaded === 'undefined' || loaded ? 1 : 0,
          transition: 'opacity 500ms ease'
        }, this.props.style]}
        {...this.props} />
    )
  }
}

export default Radium(Image)
