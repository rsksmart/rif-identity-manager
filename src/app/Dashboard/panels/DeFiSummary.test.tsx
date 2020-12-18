import React from 'react'
import { mount } from 'enzyme'
import DeFiSummary from './DeFiSummary'

describe('Component: DeFiSummary', () => {
  it('renders the component', () => {
    const wrapper = mount(<DeFiSummary balance={1.25} />)
    expect(wrapper).toBeDefined()
  })
})
