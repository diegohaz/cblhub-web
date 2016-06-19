import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton'
import cls from 'classnames'
import styles from './UserButton.scss'

import Icon, { down } from '../Icon'

const handleSection = (value) => value()

const UserButton = ({ ...props, user, className, onUserLogout, location }) => {
  return (
    <div className={cls(styles.button, className)}>
      {!user &&
        <Link to={`/login?back=${location.pathname}`} className={styles.loginButton}>Sign in</Link>
      }
      {user &&
        <Wrapper className={styles.menu} onSelection={handleSection}>
          <Button className={styles.menuButton}>
            <img src={user.picture} alt={user.name} width={24} height={24} />
            <div>{user.name}</div>
            <Icon icon={down} size={16} />
          </Button>
          <Menu className={styles.menuContent}>
            <MenuItem value={onUserLogout}>Log out</MenuItem>
          </Menu>
        </Wrapper>
      }
    </div>
  )
}

UserButton.propTypes = {
  user: PropTypes.object,
  onUserLogout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default UserButton
