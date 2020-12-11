import React from 'react'
import { shallow } from 'enzyme'
import Header from './HeaderComponent'

describe('Component: Header', () => {
  const did = 'did:ethr:rsk:testnet:0x1234567890123456789'
  const initProps = {
    did,
    chainId: 31,
    persona: { DD_NAME: [{ id: '', content: '' }] },
    hasDataVault: true,
    updatePersona: jest.fn()
  }

  const wrapper = shallow(<Header {...initProps} />)
  it('renders, is defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('loads image', () => {
    const shallowWrapper = shallow(<Header {...initProps} />)
    expect(shallowWrapper.find('img').props().src).toBe('rif-id-manager-gray.svg')
    expect(shallowWrapper.find('img').props().alt).toBe('RIF Id Manager')
  })

  it('shows the name instead of the DID if sent', () => {
    const wrapper = shallow(<Header {...initProps} persona={{ ...initProps.persona, DD_NAME: [{ id: '0156', content: 'My Name' }] }} />)
    expect(wrapper.find('h1.persona').find('div').text()).toBe('My Name')
  })
})
