import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'
import { colors } from '../../config/theme'

const Link = Radium(router.Link)

const Button = ({ ...props, children, to, style, kind = 'primary', type = 'button' }) => {
  const cx = [styles.button, styles[kind], style]
  return to
    ? <Link {...props} style={cx}>{children}</Link>
    : <button {...props} style={cx}>{children}</button>
}

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'secondary', 'accent']),
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
    backgroundColor: 'transparent',
    borderRadius: '0.13rem',
    boxSizing: 'border-box',
    ':focus': { outline: 'none' }
  },
  primary: {
    backgroundColor: colors.primary.normal,
    color: colors.grayscale.white,
    ':hover': { backgroundColor: colors.primary.dark },
    ':focus': { backgroundColor: colors.primary.dark },
    ':active': { backgroundColor: colors.primary.dark }
  },
  secondary: {
    color: colors.primary.normal,
    border: `1px solid ${colors.primary.normal}`,
    ':hover': { backgroundColor: colors.primary.light },
    ':focus': { backgroundColor: colors.primary.light },
    ':active': { backgroundColor: colors.primary.light }
  },
  accent: {
    color: colors.accent.normal,
    border: `1px solid ${colors.accent.normal}`,
    ':hover': { backgroundColor: colors.accent.light },
    ':focus': { backgroundColor: colors.accent.light },
    ':active': { backgroundColor: colors.accent.light }
  }
}

export default Radium(Button)
