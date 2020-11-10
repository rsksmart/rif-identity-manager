import React from 'react'
import { render } from 'enzyme'
import { Web3ProviderElement } from './providerContext'

describe('Component: ProviderContext', () => {
  it('renders and is defined', () => {
    const wrapper = render(<Web3ProviderElement>hello</Web3ProviderElement>)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('hello')
  })
})
