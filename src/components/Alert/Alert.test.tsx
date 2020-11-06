import React from 'react'
import { shallow, render } from 'enzyme'
import Alert from './Alert'

describe('Component: Alert', () => {
  it('renders and is defined', () => {
    const wrapper = shallow(<Alert />)
    expect(wrapper).toBeDefined()
  })

  it('displays the correct text', () => {
    const wrapper = render(<Alert title="test" description="an error" />)
    expect(wrapper.find('p').text()).toBe('an error')
    expect(wrapper.find('h2').text()).toBe('test')
  })
})
