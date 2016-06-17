import React from 'react'
import { Link } from 'react-router'
import styles from './LayoutHeader.scss'

import Logo from '../Logo'
import UserButton from '../../containers/UserButton'

const LayoutHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}><Link to='/'><Logo /></Link></div>
      <UserButton />
    </div>
  )
}

export default LayoutHeader
