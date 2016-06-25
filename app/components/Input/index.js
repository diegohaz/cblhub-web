import React, { PropTypes } from 'react'
import Radium from 'radium'
import { colors } from '../../config/theme'


const Input = ({ ...props, maxLength, description, style, label, field }) => {
  const isInvalid = field && field.touched && field.error
  return (
    <div
      style={[{
        position: 'relative',
        display: 'flex',
        marginBottom: '1rem',
        '@media screen and (max-width: 640px)': {
          flexDirection: 'column'
        }
      }, style]}>
      <div
        style={{
          position: 'relative',
          flex: 'none',
          width: description ? '50%' : '100%'
        }}>
        {label &&
          <label
            htmlFor={`${field.name}Input`}
            style={{
              display: 'block',
              fontSize: '1.2rem',
              color: colors.grayscale.dark,
              margin: '0.5rem 0'
            }}>
            {label}
          </label>
        }
        <input
          id={`${field.name}Input`}
          aria-describedby={description ? `${field.name}Description` : undefined}
          {...props} {...field}
          style={[{
            display: 'block',
            width: '100%',
            color: 'inherit',
            margin: 0,
            boxSizing: 'border-box',
            fontSize: '1.2rem',
            height: '2.7rem',
            border: `1px solid ${colors.grayscale.light}`,
            borderRadius: 2
          }, isInvalid && {
            border: `1px solid ${colors.error.light}`
          }]} />
        <div style={{ display: 'flex', margin: '0.3rem 0' }}>
          {isInvalid &&
            <div style={{ fontSize: '1rem', color: colors.error.normal }}>{field.error}</div>
          }
          {maxLength &&
            <div style={{ marginLeft: 'auto', fontSize: '1rem', color: colors.grayscale.medium }}>
              {maxLength - field.value.length}
            </div>
          }
        </div>
      </div>
      {description &&
        <div
          id={`${field.name}Description`}
          opened={field.active}
          style={{
            borderLeft: `1px solid ${colors.grayscale.light}`,
            marginLeft: '1rem',
            padding: label ? '1.2rem 0 0 1rem' : '0 0 0 1rem',
            fontSize: '0.9rem',
            lineHeight: '150%',
            color: colors.grayscale.dark,
            '@media screen and (max-width: 640px)': {
              marginLeft: 0,
              padding: 0,
              border: 0
            }
          }}>
          {description}
        </div>
      }
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.any,
    active: PropTypes.bool
  }).isRequired,
  style: PropTypes.object,
  maxLength: PropTypes.number,
  description: PropTypes.any
}

export default Radium(Input)
