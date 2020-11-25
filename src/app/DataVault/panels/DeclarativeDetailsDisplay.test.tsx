import React from 'react'
import { shallow } from 'enzyme'
import DeclarativeDetailsDisplay, { DeclarativeDetailInterface } from './DeclarativeDetailsDisplay'

describe('Component: DeclarativeDetailsDisplay.test', () => {
  const mockDeclarativeDetials: DeclarativeDetailInterface[] = [
    {
      key: '0',
      type: 'EMAIL',
      content: 'jesse@iovlabs.org'
    },
    {
      key: '1',
      type: 'NAME',
      content: 'Jesse Clark'
    }
  ]

  it('renders the component', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} />)
    expect(wrapper.find('tbody').children()).toHaveLength(2)

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    expect(wrapper.find('tr').at(1).find('td').at(1).text()).toBe('jesse@iovlabs.org')
  })
})
