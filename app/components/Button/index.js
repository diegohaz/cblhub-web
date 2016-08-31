import React, { PropTypes } from 'react'
import Radium from 'radium'
import * as router from 'react-router'
import { colors } from '../../config/style'

const Link = Radium(router.Link)

const Button = ({ ...props, children, to, style, kind = 'primary', type = 'button' }) => {
  const cx = [getStyle(props), style]
  return to
    ? <Link {...props} style={[cx, { display: 'inline-flex' }]}>{children}</Link>
    : <button {...props} type={type} style={cx}>{children}</button>
}

const getStyle = ({ kind = 'primary', disabled }) => ({
  display: 'inline-flex',
  fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
  alignItems: 'center',
  height: '2.7rem',
  justifyContent: 'center',
  textDecoration: 'none',
  cursor: disabled ? 'default' : 'pointer',
  appearance: 'none',
  transition: 'background-color 250ms ease-out, color 250ms ease-out',
  border: '1px solid transparent',
  fontSize: '1rem',
  padding: '0 1em',
  backgroundColor: 'transparent',
  borderRadius: '0.13rem',
  boxSizing: 'border-box',
  ... kind === 'primary' && {
    backgroundColor: colors.primary[disabled ? 'light' : 'medium'],
    color: colors.grayscale.white,
    ... disabled || {
      ':hover': { backgroundColor: colors.primary.dark },
      ':focus': { backgroundColor: colors.primary.dark, outline: 'none' },
      ':active': { backgroundColor: colors.primary.dark }
    }
  },
  ... kind === 'secondary' && {
    color: colors.grayscale[disabled ? 'medium' : 'dark'],
    border: `1px solid ${colors.grayscale[disabled ? 'light' : 'medium']}`,
    ... disabled || {
      ':hover': { backgroundColor: colors.grayscale.light },
      ':focus': { backgroundColor: colors.grayscale.light, outline: 'none' },
      ':active': { backgroundColor: colors.grayscale.light }
    }
  },
  ... kind === 'accent' && {
    backgroundColor: colors.accent[disabled ? 'light' : 'medium'],
    color: colors.grayscale.white,
    ... disabled || {
      ':hover': { backgroundColor: colors.accent.dark },
      ':focus': { backgroundColor: colors.accent.dark, outline: 'none' },
      ':active': { backgroundColor: colors.accent.dark }
    }
  }
})

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'secondary', 'accent']),
  disabled: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.object,
  type: PropTypes.string,
  to: PropTypes.string
}

export default Radium(Button)
