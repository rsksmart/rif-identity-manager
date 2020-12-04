import React from 'react'
import { mount } from 'enzyme'
import DataVaultSummary from './DataVaultSummary'

describe('Component: DataVaultSummary.test', () => {
  const defaultProps = { storage: { used: 0, available: 0 }, handleButton: jest.fn() }

  it('renders the component', () => {
    const wrapper = mount(<DataVaultSummary {...defaultProps} />)
    expect(wrapper).toBeDefined()
  })

  it('handles DataVault click', () => {
    const handleClick = jest.fn()
    const wrapper = mount(<DataVaultSummary {...defaultProps} handleButton={handleClick} />)

    wrapper.find('button').simulate('click')
    expect(handleClick).toBeCalledTimes(1)
  })

  it('displays numbers in tooltip', () => {
    const props = { storage: { used: 150, available: 890 }, handleButton: jest.fn() }
    const wrapper = mount(<DataVaultSummary {...props} />)
    expect(wrapper.find('.hover-content').first().text()).toBe('150 of 890')
  })
})
