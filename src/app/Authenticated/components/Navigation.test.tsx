import React from 'react'
import { shallow, mount } from 'enzyme'
import Navigation, { screens } from './Navigation'

describe('Screen: Dashboard', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Navigation selected='DASHBOARD' handleClick={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('sets the active item', () => {
    const wrapper = mount(<Navigation selected={screens.DASHBOARD} handleClick={jest.fn()} />)
    expect(wrapper.find('li.active').text()).toBe('Dashboard')
  })

  it('function clicks the correct item', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Navigation selected={screens.DASHBOARD} handleClick={onClick} showDataVault={true} />)

    wrapper.find('.datavault').find('button').simulate('click')
    expect(onClick).toBeCalledWith(screens.DATAVAULT)
  })
})
