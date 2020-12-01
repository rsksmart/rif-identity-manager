import React from 'react'
import { shallow } from 'enzyme'
import DeclarativeDetailsDisplay from './DeclarativeDetailsDisplay'
import { DataVaultKey } from '../../state/reducers/datavault'

describe('Component: DeclarativeDetailsDisplay', () => {
  const mockDeclarativeDetials: DataVaultKey = {
    EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
    NAME: [{ id: '5', content: 'Jesse Clark' }]
  }

  it('renders the component', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} />)
    expect(wrapper.find('tbody').children()).toHaveLength(2)

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    expect(wrapper.find('tr').at(1).find('td').at(1).text()).toBe('jesse@iovlabs.org')
  })
})
