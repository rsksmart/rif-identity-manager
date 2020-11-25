import React from 'react'
import { shallow, mount } from 'enzyme'
import Balance from './Balance'

describe('Component: Balace', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Balance />)
    expect(wrapper).toBeDefined()
  })

  it('has a single balance', () => {
    const tokens = [
      { address: '0x123', balance: 4, name: 'test token', symbol: 'TEST' }
    ]
    const wrapper = mount(<Balance tokens={tokens} />)
    const token = wrapper.find('.token')
    expect(token.length).toBeDefined()
    expect(token.find('.heading-symbol').text()).toBe('test token')
    expect(token.find('.balance').text()).toBe('4')
    expect(token.find('.symbol').text()).toBe('TEST')
  })

  it('handles multiple tokens', () => {
    const tokens = [
      { address: '0x123', balance: 4, name: 'test token', symbol: 'TEST' },
      { address: '0x456', balance: 4, name: 'test token', symbol: 'TEST2' }
    ]
    const wrapper = mount(<Balance tokens={tokens} />)
    expect(wrapper.find('.token')).toHaveLength(2)
  })
})
