import React from 'react'
import { mount } from 'enzyme'
import UserIcon from './UserIcon'

describe('Component: UserIcon.test', () => {
  const value = '0x1234567890123456780'
  it('renders the component', () => {
    const wrapper = mount(<UserIcon value={value} />)
    expect(wrapper).toBeDefined()
  })

  it('uses the correct value', () => {
    const wrapper = mount(<UserIcon value={value} />)
    expect(wrapper.props().value).toBe(value)
    expect(wrapper.find('img').props().alt).toBe(value)
  })

  it('sets custom size', () => {
    const wrapper = mount(<UserIcon value={value} size={500} />)
    expect(wrapper.find('img').props().style?.height).toBe('500px')
    expect(wrapper.find('img').props().style?.width).toBe('500px')
  })
})
