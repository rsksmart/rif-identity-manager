import React from 'react'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Component: Button', () => {
  it('renders, is defined', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toBeDefined()
  })

  it('loads image', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('img').props().src).toBe('rif-id-manager-gray.svg')
  })
})
