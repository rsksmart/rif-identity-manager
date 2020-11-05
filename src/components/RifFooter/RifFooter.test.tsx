import React from 'react'
import { shallow } from 'enzyme'
import RifFooter from './RifFooter'

describe('Component: Rif Footer', () => {
  it('renders and is defined', () => {
    const wrapper = shallow(<RifFooter isLoggedIn version="0.0.1" />)
    expect(wrapper).toBeDefined()
  })

  it('loads the footer text', () => {
    const wrapper = shallow(<RifFooter isLoggedIn version="0.0.1" />)

    expect(wrapper.find('img').props().src).toBe('powered-by-iov-gray.svg')
    expect(wrapper.find('p').at(0).text()).toBe('Copyright © 2020 IOV Labs. All rights reserved.')
  })

  it('loads white footer image when not logged in', () => {
    const wrapper = shallow(<RifFooter isLoggedIn={false} version="0.0.1" />)
    expect(wrapper.find('footer').find('img').props().src).toBe('powered-by-iov.svg')
  })
})
