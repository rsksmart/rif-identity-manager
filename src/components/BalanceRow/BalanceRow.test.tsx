import React from 'react'
import { mount } from 'enzyme'
import BalanceRow from './BalanceRow'

describe('Component: BalanceRow.test', () => {
  const props = {
    name: 'Name',
    balance: 0.1898,
    symbol: 'SYM'
  }

  it('renders the component with the correct parameters', () => {
    const wrapper = mount(<BalanceRow {...props}/>)
    expect(wrapper).toBeDefined()

    expect(wrapper.find('h2').text()).toBe('Name')
    expect(wrapper.find('.balance').text()).toBe('0.1898')
    expect(wrapper.find('.symbol').text()).toBe('SYM')
  })

  it('truncates the balance to eight places if longer', () => {
    const wrapper = mount(<BalanceRow {...props} balance={1.258480974564560} />)
    expect(wrapper.find('.balance').text()).toBe('1.25848097')
  })
})
