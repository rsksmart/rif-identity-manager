import React from 'react'
import { shallow } from 'enzyme'
import AddEmail from './AddEmail'

describe('Component: AddEmail', () => {
  const mockAddress = 'did:ethr:rsk:testnet:0xf7b00cb3e61701a8c7fae1ce8c82728f1f9a241b'
  const mockChainId = 1

  it('renders the component', () => {
    const wrapper = shallow(<AddEmail address={mockAddress} chainId={mockChainId} addVerifiedCredentials={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<AddEmail address={mockAddress} chainId={mockChainId} addVerifiedCredentials={jest.fn()} />)
    expect(wrapper.find('.container').children()).toHaveLength(5)

    // expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    // expect(wrapper.find('tr').at(1).find('.content').text()).toBe('jesse@iovlabs.org')
  })
})
