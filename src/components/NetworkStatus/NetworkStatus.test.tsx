import React from 'react'
import { shallow } from 'enzyme'
import NetworkStatus from './NetworkStatus'

describe('Component: Button', () => {
  it('renders, is defined', () => {
    const wrapper = shallow(<NetworkStatus connected name="RSK Mainnet" />)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('RSK Mainnet')
    expect(wrapper.props().className).toBe('connected')
  })

  it('shows disconnected', () => {
    const wrapper = shallow(<NetworkStatus connected={false} name="RSK Mainnet" />)
    expect(wrapper.props().className).toBe('disconnected')
  })

  it('takes a chainId instead of a name', () => {
    const wrapper = shallow(<NetworkStatus connected chainId={31} />)
    expect(wrapper.text()).toBe('RSK Testnet')
  })
})
