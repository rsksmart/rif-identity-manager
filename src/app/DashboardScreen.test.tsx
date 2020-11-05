import React from 'react'
import { shallow } from 'enzyme'
import DashboardScreen from './DashboardScreen'

describe('Screen: Dashboard', () => {
  it('renders the component', () => {
    const wrapper = shallow(<DashboardScreen handleLoginOut={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })
})
