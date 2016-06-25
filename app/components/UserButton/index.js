import React, { PropTypes } from 'react'
import * as ariaMenu from 'react-aria-menubutton'
import Radium from 'radium'
import { colors } from '../../config/theme'

import Icon, { down } from '../Icon'

const Wrapper = Radium(ariaMenu.Wrapper)
const Trigger = Radium(ariaMenu.Button)
const Menu = Radium(ariaMenu.Menu)
const MenuItem = Radium(ariaMenu.MenuItem)

import Button from '../Button'

const handleSection = (value) => value()

const UserButton = ({ ...props, user, onUserLogout, location }) => {
  if (user) {
    return (
      <Wrapper style={styles.wrapper} onSelection={handleSection}>
        <Trigger style={[styles.trigger, { display: 'inline-flex' }]}>
          <img
            src={user.picture}
            alt={user.name}
            width={24}
            height={24}
            style={styles.picture} />
          {user.name}
          <Icon icon={down} size={16} style={{ marginLeft: 8 }} />
        </Trigger>
        <Menu style={styles.menu}>
          <MenuItem style={styles.item} value={onUserLogout}>Log out</MenuItem>
        </Menu>
      </Wrapper>
    )
  } else {
    return <Button kind='secondary' to={`/login?back=${location.pathname}`}>Sign in</Button>
  }
}

UserButton.propTypes = {
  user: PropTypes.object,
  onUserLogout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const focusStyle = {
  backgroundColor: colors.grayscale.light
}

const styles = {
  wrapper: {
    position: 'relative'
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '2.7rem',
    textAlign: 'center',
    lineHeight: 1,
    appearance: 'none',
    fontSize: '1rem',
    padding: '0 1em',
    borderRadius: '0.13rem',
    backgroundColor: 'transparent',
    border: `1px solid ${colors.grayscale.light}`,
    transition: 'background-color 250ms ease-out, color 250ms ease-out',
    cursor: 'pointer',
    ':hover': focusStyle,
    ':focus': { ...focusStyle, outline: 'none' }
  },
  menu: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    border: `1px solid ${colors.grayscale.medium}`,
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  item: {
    padding: 8,
    ':hover': focusStyle,
    ':focus': { ...focusStyle, outline: 'none' }
  },
  picture: {
    flex: 'none',
    marginRight: 8,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `1px solid ${colors.grayscale.medium}`
  }
}

export default Radium(UserButton)
