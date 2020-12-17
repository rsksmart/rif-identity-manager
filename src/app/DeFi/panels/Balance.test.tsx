import React from 'react'
import { shallow, mount } from 'enzyme'
import Balance from './Balance'

describe('Component: Balace', () => {
  const props = {
    chainId: 4,
    addCustomToken: jest.fn(),
    balance: 0
  }

  it('renders the component', () => {
    const wrapper = shallow(<Balance {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the default balance', () => {
    const wrapper = mount(<Balance {...props} balance={1.2} />)
    expect(wrapper.find('.defaultBalance').find('.balance').text()).toBe('1.2')
  })

  it('has a single balance', () => {
    const tokens = [
      { address: '0x123', balance: 4, name: 'test token', symbol: 'TEST' }
    ]
    const wrapper = mount(<Balance {...props} tokens={tokens} />)
    const token = wrapper.find('.balance-row')
    expect(token.length).toBeDefined()
    expect(token.find('h2').text()).toBe('test token')
    expect(token.find('.balance').text()).toBe('4')
    expect(token.find('.symbol').text()).toBe('TEST')
  })

  it('handles multiple tokens', () => {
    const tokens = [
      { address: '0x123', balance: 4, name: 'test token', symbol: 'TEST' },
      { address: '0x456', balance: 4, name: 'test token', symbol: 'TEST2' }
    ]
    const wrapper = mount(<Balance {...props} tokens={tokens} />)
    expect(wrapper.find('.balance-row')).toHaveLength(2)
  })
})
