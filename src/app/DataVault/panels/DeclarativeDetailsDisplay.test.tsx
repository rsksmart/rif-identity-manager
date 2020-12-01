import React from 'react'
import { shallow, mount } from 'enzyme'
import DeclarativeDetailsDisplay from './DeclarativeDetailsDisplay'
import { DataVaultKey } from '../../state/reducers/datavault'

describe('Component: DeclarativeDetailsDisplay', () => {
  const mockDeclarativeDetials: DataVaultKey = {
    EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
    NAME: [{ id: '5', content: 'Jesse Clark' }]
  }

  it('renders the component', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} deleteValue={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} deleteValue={jest.fn()} />)
    expect(wrapper.find('tbody').children()).toHaveLength(2)

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    expect(wrapper.find('tr').at(1).find('.content').text()).toBe('jesse@iovlabs.org')
  })

  it('does not show the key row if it has no content', () => {
    const mockDetails: DataVaultKey = {
      EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
      NAME: []
    }

    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDetails} deleteValue={jest.fn()} />)
    expect(wrapper.find('tbody').children()).toHaveLength(1)
  })

  it('handles delete click', () => {
    const deleteValue = jest.fn()
    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} deleteValue={deleteValue} />)

    wrapper.find('.content-row').at(0).find('button').simulate('click')
    wrapper.find('.delete-modal').find('.column').at(1).find('button').simulate('click')
    expect(deleteValue).toBeCalledWith('EMAIL', '1')
  })
})
