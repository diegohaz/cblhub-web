import React, { Component, PropTypes } from 'react'

import Input from '../Input'
import Button from '../Button'
import Icon, { search } from '../Icon'

class SearchBar extends Component {
  static propTypes () {
    return {

    }
  }

  render () {
    return (
      <div style={{ display: 'flex', position: 'relative' }}>
        <Input type="search" style={{ height: '2.7rem' }} />
        <Button style={{ borderRadius: '0 0.13rem 0.13rem 0' }}><Icon icon={search} /></Button>
      </div>
    )
  }
}

export default SearchBar
