import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors, writeMediaQuery, breakpoints } from '../../config/style'

import Input from '../Input'
import Textarea from '../Textarea'

export const FormControl = ({
  ...props,
  children,
  type = 'text',
  desc,
  style,
  label,
  field = {}
}) => {
  const { maxLength } = field
  const invalid = field && field.touched && field.error
  const fieldId = `${field.name}Field`
  const descId = `${field.name}Desc`
  const fieldProps = {
    ...field,
    'aria-describedby': desc ? descId : undefined,
    id: fieldId,
    invalid: !!invalid
  }
  return (
    <div style={[getStyle(props), style]}>
      <div style={getWrapperStyle(props)}>
        {label && <label htmlFor={fieldId} style={getLabelStyle(props)}>{label}</label>}
        {type === 'textarea' && <Textarea id={fieldId} {...fieldProps} />}
        {type !== 'textarea' && <Input type={type} id={fieldId} {...fieldProps} />}
        {children}
        <div style={getFooterStyle(props)}>
          {invalid && <div style={getErrorStyle(props)}>{field.error}</div>}
          {maxLength && <div style={getLengthStyle(props)}>{maxLength - field.value.length}</div>}
        </div>
      </div>
      {desc && <div id={descId} style={getDescStyle(props)}>{desc}</div>}
    </div>
  )
}

const getStyle = () => ({
  position: 'relative',
  display: 'flex',
  marginBottom: '1rem',
  [writeMediaQuery(breakpoints.small)]: {
    flexDirection: 'column'
  }
})

const getWrapperStyle = ({ desc }) => ({
  position: 'relative',
  flex: 'none',
  width: desc ? '50%' : '100%',
  [writeMediaQuery(breakpoints.small)]: {
    width: '100%'
  }
})

const getLabelStyle = () => ({
  display: 'block',
  fontSize: '1.125rem',
  color: colors.grayscale.dark,
  margin: '0.5rem 0'
})

const getFooterStyle = () => ({
  display: 'flex',
  margin: '0.3rem 0'
})

const getErrorStyle = () => ({
  fontSize: '1rem',
  color: colors.error.medium
})

const getLengthStyle = ({ field }) => ({
  visibility: field.active ? 'visible' : 'hidden',
  marginLeft: 'auto',
  fontSize: '1rem',
  color: colors.grayscale.dark
})

const getDescStyle = ({ label }) => ({
  borderLeft: `1px solid ${colors.grayscale.light}`,
  marginLeft: '1rem',
  padding: label ? '1.2rem 0 0 1rem' : '0 0 0 1rem',
  fontSize: '0.9rem',
  lineHeight: '150%',
  color: colors.grayscale.dark,
  [writeMediaQuery(breakpoints.small)]: {
    marginLeft: 0,
    padding: 0,
    border: 0
  }
})

FormControl.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.any,
    active: PropTypes.bool,
    maxLength: PropTypes.number
  }).isRequired,
  style: PropTypes.object,
  desc: PropTypes.any
}

export default Radium(FormControl)
