import React, { PropTypes } from 'react'
import { colors } from '../../config/style'

const Separator = ({ title }) => {
  return (
    <div style={styles.separator}>
      <div style={styles.line} />
      {title && <div style={styles.title}>{title}</div>}
      <div style={styles.line} />
    </div>
  )
}

const styles = {
  separator: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  line: {
    backgroundColor: colors.grayscale.light,
    width: '100%',
    height: 1,
    margin: '1.5rem 0',
    flex: 1
  },
  title: {
    padding: '0 1.5rem',
    whiteSpace: 'nowrap',
    margin: '1.5rem 0',
    backgroundColor: colors.grayscale.white
  }
}

Separator.propTypes = {
  title: PropTypes.string
}

export default Separator
