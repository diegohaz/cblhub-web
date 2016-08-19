import React from 'react'
import { Link } from 'react-router'

import Logo from '../Logo'
import Button from '../Button'
import UserButton from '../../containers/UserButton'

const LayoutHeader = () => {
  return (
    <div style={getStyle()}>
      <Link to='/'><Logo /></Link>
      <div style={{ flex: 1 }} />
      <Button
        kind='accent'
        style={{ marginRight: '0.5rem' }}
        to='/challenges/create'>
        Create challenge
      </Button>
      <UserButton />
    </div>
  )
}

const getStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem',
  width: '100%',
  height: '4rem',
  boxSizing: 'border-box'
})

export default LayoutHeader
