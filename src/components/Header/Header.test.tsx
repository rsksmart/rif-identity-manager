import React from 'react'
import { render, shallow } from 'enzyme'
import Header from './Header'
import { Web3ProviderElement } from '../../providerContext'

describe('Component: Header', () => {
  it('renders, is defined', () => {
    const wrapper = render(
      <Web3ProviderElement>
        <Header />
      </Web3ProviderElement>
    )
    expect(wrapper).toBeDefined()
  })

  it('loads image', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('img').props().src).toBe('rif-id-manager-gray.svg')
    expect(wrapper.find('img').props().alt).toBe('RIF Id Manager')
  })
})
