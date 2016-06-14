import React, { PropTypes } from 'react'

const PageLayout = ({ children }) => (
  <div>{children}</div>
)

PageLayout.propTypes = {
  children: PropTypes.object
}

export default PageLayout
