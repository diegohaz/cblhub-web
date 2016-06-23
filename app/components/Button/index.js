import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'

const Link = Radium(router.Link)

const Button = ({ children, to, style, kind = 'primary', type = 'button' }) => {
  if (to) {
    return (
      <Link to={to} style={[styles.button, styles[kind], { display: 'inline-flex' }, style]}>
        {children}
      </Link>
    )
  } else {
    return (
      <button type={type} style={[styles.button, styles[kind], { display: 'inline-flex' }, style]}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  kind: PropTypes.oneOf(['primary']),
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string,
  to: PropTypes.string
}

const styles = {
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '2.7rem',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 1,
    cursor: 'pointer',
    appearance: 'none',
    transition: 'background-color 250ms ease-out, color 250ms ease-out',
    border: '1px solid transparent',
    fontSize: '1rem',
    padding: '0 1em',
    borderRadius: '0.13rem',
    ':active': { outline: 'none' }
  },
  primary: {
    backgroundColor: '#2199e8',
    color: '#fff',
    ':hover': { backgroundColor: '#1583cc' },
    ':focus': { backgroundColor: '#1583cc' },
    ':active': { backgroundColor: '#1583cc' }
  }
}

export default Radium(Button)
