import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import Dialog from './'

describe('Dialog Component', function () {
  const render = (children) => shallow(<Dialog>{children}</Dialog>)

  it('should render the dialog with children', function () {
    const dialog = render(<div className="foo">test</div>)
    expect(dialog.contains(<div className="foo">test</div>)).toBeTruthy()
  })
})
