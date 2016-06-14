import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { Link } from 'react-router'
import Tag from './'

const render = (props) => {
  const renderer = TestUtils.createRenderer()
  renderer.render(<Tag {...props} />)

  return renderer.getRenderOutput()
}

describe('Tag Component', function () {
  it('should render correctly', function () {
    const tag = { name: 'tag' }
    const output = render({ tag })
    const child = output.props.children

    expect(child.type).toBe(Link)
    expect(child.props.to).toEqual('/?q=tag')
    expect(child.props.children).toEqual('tag')
  })
})
