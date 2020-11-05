import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App test', () => {
  it('renders the component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })

  it('loads the SVG image without character issues', () => {
    const wrapper = shallow(<App />)
    const image = wrapper.find('.app-header').find('img')

    expect(image.props().alt).toBe('RIF identity Manager')
    expect(image.props().src).toBe('rif-id-manager.svg')
  })

  it('loads the footer text', () => {
    const wrapper = shallow(<App />)
    const footer = wrapper.find('footer')

    expect(footer.find('img').props().src).toBe('powered-by-iov.svg')
    expect(footer.find('p').at(0).text()).toBe('Copyright © 2020 IOV Labs. All rights reserved.')
  })
})
