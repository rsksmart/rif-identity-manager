import React from 'react'
import { shallow } from 'enzyme'
import DeclarativeDetailsDisplay from './DeclarativeDetailsDisplay'
import { DataVaultKey } from '../../state/reducers/datavault'

describe('Component: DeclarativeDetailsDisplay', () => {
  const mockDeclarativeDetials: DataVaultKey[] = [
    {
      key: 'EMAIL',
      content: ['jesse@iovlabs.org']
    },
    {
      key: 'NAME',
      content: ['Jesse Clark']
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
