import React, { PropTypes, Component } from 'react'
import Radium from 'radium'

class Image extends Component {
  static propTypes = {
    style: PropTypes.object,
    src: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.setImageState = this.setImageState.bind(this)
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      this.setImageState()
      document.addEventListener('scroll', this.setImageState, true)
    }
  }

  componentWillUnmount () {
    document.removeEventListener('scroll', this.setImageState, true)
  }

  setImageState () {
    const { image } = this.refs

    if (image && this.isInViewport()) {
      document.removeEventListener('scroll', this.setImageState, true)
      this.setState({ inViewport: true })

      if (!image.complete) {
        image.addEventListener('load', () => this.setState({ loaded: true }))
      } else {
        this.setState({ loaded: true })
      }
    }
  }

  isInViewport () {
    if (!this.refs.image) return true

    const rect = this.refs.image.getBoundingClientRect()

    if (typeof window !== 'undefined') {
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      )
    } else {
      return false
    }
  }

  render () {
    if (typeof window !== 'undefined') {
      return (
        <img
          {...this.props}
          ref="image"
          src={this.state.inViewport ? this.props.src : undefined}
          style={[getStyle(this.state), this.props.style]} />
      )
    } else {
      return (
        <noscript>
          <img {...this.props} />
        </noscript>
      )
    }
  }
}

const getStyle = ({ loaded }) => ({
  opacity: loaded ? 1 : 0,
  transition: 'opacity 500ms ease'
})

export default Radium(Image)
