import React from 'react'
import { Link } from 'react-router'
import { writeMediaQuery, breakpoints } from '../../config/style'

import Logo from '../Logo'
import Button from '../Button'
import Icon, { plus } from '../Icon'
import UserButton from '../../containers/UserButton'

const LayoutHeader = () => {
  return (
    <div style={getStyle()}>
      <Link to="/"><Logo /></Link>
      <div style={{ flex: 1 }} />
      <Button
        kind="accent"
        style={{ marginRight: '0.5rem' }}
        to="/challenges/create">
        <Icon icon={plus} style={{ display: 'none', [writeMediaQuery(breakpoints.small)]: { display: 'block' } }} />
        <span style={{ [writeMediaQuery(breakpoints.small)]: { display: 'none' } }}>Create challenge</span>
      </Button>
      <UserButton />
    </div>
  )
}

const getStyle = () => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 0.5rem 0 1rem',
  width: '100%',
  height: '4rem',
  boxSizing: 'border-box'
})

export default LayoutHeader
