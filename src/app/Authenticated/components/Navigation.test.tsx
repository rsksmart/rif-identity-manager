import React from 'react'
import { shallow, mount } from 'enzyme'
import Navigation, { screens } from './Navigation'

describe('Screen: Dashboard', () => {
  const sharedProps = {
    selected: 'DASHBOARD',
    handleClick: jest.fn(),
    logout: jest.fn()
  }
  it('renders the component', () => {
    const wrapper = shallow(<Navigation {...sharedProps} selected='DASHBOARD' />)
    expect(wrapper).toBeDefined()
  })

  it('sets the active item', () => {
    const wrapper = mount(<Navigation {...sharedProps} selected={screens.DASHBOARD} />)
    expect(wrapper.find('li.active').text()).toBe('Dashboard')
  })

  it('function clicks the correct item', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Navigation {...sharedProps} selected={screens.DASHBOARD} handleClick={onClick} showDataVault={true} />)

    wrapper.find('.datavault').find('button').simulate('click')
    expect(onClick).toBeCalledWith(screens.DATAVAULT)
  })

  it('calls logout when clicked', () => {
    const logout = jest.fn()
    const wrapper = shallow(<Navigation {...sharedProps} logout={logout} />)
    wrapper.find('.logout').find('button').simulate('click')

    expect(logout).toBeCalledTimes(1)
  })
})
