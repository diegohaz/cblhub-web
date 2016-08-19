import React from 'react'
import Radium from 'radium'
import { colors } from '../../config/style'

const LayoutFooter = () => {
  return (
    <div style={getStyle()}>
      footer
    </div>
  )
}

const getStyle = () => ({
  width: '100%',
  padding: '1rem',
  backgroundColor: colors.grayscale.dark,
  color: colors.grayscale.white,
  boxSizing: 'border-box'
})

export default Radium(LayoutFooter)
