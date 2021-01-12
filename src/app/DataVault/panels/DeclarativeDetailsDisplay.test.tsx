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
    swapValue: jest.fn(),
    getKeyContent: jest.fn()
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

  it('shows the key row if it has no content with download button', () => {
    const mockDetails: DataVaultKey = {
      EMAIL: [{ id: '1', content: 'jesse@iovlabs.org' }],
      NAME: []
    }

    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDetails} {...mockedAttributes} />)
    expect(wrapper.find('tr').at(1).find('.content').text()).toBe('jesse@iovlabs.org')
    expect(wrapper.find('tr').at(2).find('.decrypt').text()).toBe('Download')
  })

  it('handles delete click', async () => {
    const deleteFunction = jest.fn()
    const deleteValue = (key: string, id: string) => new Promise((resolve) => resolve(deleteFunction(key, id)))
    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} {...mockedAttributes} deleteValue={deleteValue} />)

    wrapper.find('.content-row').at(0).find('button.delete').simulate('click')

    await act(async () => {
      await wrapper.find('.delete-modal').find('.column').at(1).find('button').simulate('click')

      expect(deleteFunction).toBeCalledTimes(1)
      expect(deleteFunction).toBeCalledWith('EMAIL', '1')
    })
  })

  it('handles swap click', async () => {
    const editFunction = jest.fn()
    const swapValue = (key:string, content: string, id: string) => new Promise((resolve) => resolve(editFunction(key, content, id)))
    const wrapper = mount(<DeclarativeDetailsDisplay details={mockDeclarativeDetials} {...mockedAttributes} swapValue={swapValue} />)

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

  it('handles getContent click', async () => {
    const getFunction = jest.fn()
    const getContent = (_key:string) => new Promise((resolve) => resolve(getFunction()))

    const wrapper = mount(<DeclarativeDetailsDisplay details={{ EMAIL: [] }} {...mockedAttributes} getKeyContent={getContent} />)

    await act(async () => {
      wrapper.find('.decrypt').find('button').simulate('click')
      expect(getFunction).toBeCalledTimes(1)
    })
  })
})
