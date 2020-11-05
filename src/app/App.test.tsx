import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('Screen: App', () => {
  it('renders the component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })

  it('renders the login screen initially', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('LoginScreen')).toBeDefined()
    expect(wrapper.find('.app').props().className).toBe('app login')
  })
})
