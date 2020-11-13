import React from 'react'
import { render, shallow } from 'enzyme'
import Header from './HeaderComponent'

describe('Component: Header', () => {
  const wrapper = render(<Header address="0x1234567890123456789" chainId={31} />)
  it('renders, is defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('sets the DID from the address and chainId', () => {
    expect(wrapper.find('h1').text()).toBe('did:rsk:testnet:0x1234...6789')
    expect(wrapper.find('.network').text()).toBe('RSK Testnet')
  })

  it('loads image', () => {
    const shallowWrapper = shallow(<Header address="0x1234567890123456789" chainId={31} />)
    expect(shallowWrapper.find('img').props().src).toBe('rif-id-manager-gray.svg')
    expect(shallowWrapper.find('img').props().alt).toBe('RIF Id Manager')
  })
})
