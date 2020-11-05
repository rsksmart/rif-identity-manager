import React from 'react'
import { shallow } from 'enzyme'
import LoginScreen from './LoginScreen'
import { wrap } from 'module'

describe('Screen: Login', () => {
  it('renders the component', () => {
    const wrapper = shallow(<LoginScreen handleLogin={jest.fn()} />)
    expect(wrapper).toBeDefined()
    expect(wrapper.find('h1').text()).toBe('Sign in')
    expect(wrapper.find('p').text()).toBe('Don\'t have a wallet? Download here')
  })

  it('loads the SVG image without character issues', () => {
    const wrapper = shallow(<LoginScreen handleLogin={jest.fn()} />)
    const image = wrapper.find('.login-screen').find('img')

    expect(image.props().alt).toBe('RIF identity Manager')
    expect(image.props().src).toBe('rif-id-manager.svg')
  })
})
