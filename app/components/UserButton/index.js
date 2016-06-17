import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import cls from 'classnames'
import styles from './UserButton.scss'

const UserButton = ({ user, className }) => {
  return (
    <div className={cls(styles.button, className)}>
      {!user &&
        <Link to={'/login'} className={styles.loginButton}>Sign in</Link>
      }
      {user &&
        <div>{user.name}</div>
      }
    </div>
  )
}

UserButton.propTypes = {
  user: PropTypes.object,
  className: PropTypes.string
}

export default UserButton
