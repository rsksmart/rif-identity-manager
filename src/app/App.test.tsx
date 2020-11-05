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

  it('loads the footer text', () => {
    const wrapper = shallow(<App />)
    const footer = wrapper.find('footer')

    expect(footer.find('img').props().src).toBe('powered-by-iov.svg')
    expect(footer.find('p').at(0).text()).toBe('Copyright © 2020 IOV Labs. All rights reserved.')
  })
})
