import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'
import { colors } from '../../config/style'

const Link = Radium(router.Link)

const Button = ({ ...props, children, to, style, kind = 'primary', type = 'button' }) => {
  const cx = [styles.button, styles[kind], style]
  return to
    ? <Link {...props} style={[cx, { display: 'inline-flex' }]}>{children}</Link>
    : <button {...props} type={type} style={cx}>{children}</button>
}

const styles = {
  button: {
    fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
    alignItems: 'center',
    height: '2.7rem',
    justifyContent: 'center',
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
    backgroundColor: colors.primary.medium,
    color: colors.grayscale.white,
    ':hover': { backgroundColor: colors.primary.dark },
    ':focus': { backgroundColor: colors.primary.dark },
    ':active': { backgroundColor: colors.primary.dark }
  },
  secondary: {
    color: colors.grayscale.dark,
    border: `1px solid ${colors.grayscale.medium}`,
    ':hover': { backgroundColor: colors.grayscale.light },
    ':focus': { backgroundColor: colors.grayscale.light },
    ':active': { backgroundColor: colors.grayscale.light }
  },
  accent: {
    backgroundColor: colors.accent.medium,
    color: colors.grayscale.white,
    ':hover': { backgroundColor: colors.accent.dark },
    ':focus': { backgroundColor: colors.accent.dark },
    ':active': { backgroundColor: colors.accent.dark }
  }
}

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'secondary', 'accent']),
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string,
  to: PropTypes.string
}

export default Radium(Button)
