import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DeclarativeDetailsDisplay from './DeclarativeDetailsDisplay'
import { DataVaultKey } from '../../state/reducers/datavault'

describe('Component: DeclarativeDetailsDisplay', () => {
  const mockDeclarativeDetials: DataVaultKey = {
    EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
    NAME: [{ id: '5', content: 'Jesse Clark' }]
  }

  const mockedAttributes = {
    deleteValue: jest.fn(),
    swapValue: jest.fn()
  }

  it('renders the component', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} {...mockedAttributes} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the content in a row', () => {
    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} {...mockedAttributes} />)
    expect(wrapper.find('tbody').children()).toHaveLength(2)

    expect(wrapper.find('tr').at(1).find('td').at(0).text()).toBe('EMAIL')
    expect(wrapper.find('tr').at(1).find('.content').text()).toBe('jesse@iovlabs.org')
  })

  it('does not show the key row if it has no content', () => {
    const mockDetails: DataVaultKey = {
      EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
      NAME: []
    }

    const wrapper = shallow(<DeclarativeDetailsDisplay details={mockDetails} {...mockedAttributes} />)
    expect(wrapper.find('tbody').children()).toHaveLength(1)
  })

<<<<<<< HEAD
  it('handles delete click', async () => {
    const deleteFunction = jest.fn()
    const deleteValue = (key: string, id: string) => new Promise((resolve) => resolve(deleteFunction(key, id)))
    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} deleteValue={deleteValue} swapValue={jest.fn()} />)

    wrapper.find('.content-row').at(0).find('button.delete').simulate('click')

    await act(async () => {
      await wrapper.find('.delete-modal').find('.column').at(1).find('button').simulate('click')

      expect(deleteFunction).toBeCalledTimes(1)
      expect(deleteFunction).toBeCalledWith('EMAIL', '1')
    })
  })

=======
>>>>>>> c57224c... Extract DeleteButton into its own component
  it('handles swap click', async () => {
    const editFunction = jest.fn()
    const swapValue = (key:string, content: string, id: string) => new Promise((resolve) => resolve(editFunction(key, content, id)))
    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} deleteValue={jest.fn()} swapValue={swapValue} />)

    wrapper.find('.content-row').at(0).find('button.edit').simulate('click')
    expect(wrapper.find('textarea').props().value).toBe('jesse@iovlabs.org')

    await act(async () => {
      await wrapper.find('.edit-modal').find('button.submit').simulate('click')
      wrapper.update()
      expect(wrapper.find('.modal-content').find('div.alert.error').text()).toBe('New value is the same as the old.')

      wrapper.find('textarea.line').simulate('change', { target: { value: 'new@value.org' } })
      expect(wrapper.find('textarea').props().value).toBe('new@value.org')

      await wrapper.find('.edit-modal').find('button.submit').simulate('click')
      wrapper.update()

      expect(editFunction).toBeCalledTimes(1)
      expect(editFunction).toBeCalledWith('EMAIL', 'new@value.org', '1')
    })
  })
})
