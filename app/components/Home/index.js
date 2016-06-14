import React from 'react'
import Helmet from 'react-helmet'

import Tag from '../Tag'

const Home = () => {
  return (
    <div>
      <Helmet title='Oisa' />
      <Tag tag={{ id: '1', name: 'IBM Watsom' }} />
    </div>
  )
}

export default Home
