import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import Component from './DeleteDvContentButton'

describe('Component: DeleteDvContentButton.test', () => {
  const defaultProps = {
    itemKey: 'MY_KEY',
    item: { id: '4', content: 'hello' },
    deleteValue: jest.fn()
  }

  it('renders the component', () => {
    const wrapper = mount(<Component {...defaultProps} />)
    expect(wrapper).toBeDefined()
  })

  it('handles delete click', async () => {
    const deleteFunction = jest.fn()
    const deleteValue = (key: string, id: string) => new Promise((resolve) => resolve(deleteFunction(key, id)))
    const wrapper = mount(<Component {...defaultProps} key="MY_KEY" deleteValue={deleteValue} />)

    await act(async () => {
      await wrapper.find('button.delete').simulate('click')
      wrapper.update()
      await wrapper.find('.delete-modal').find('.column').at(1).find('button').simulate('click')

      await act(async () => {
        expect(deleteFunction).toBeCalledTimes(1)
        expect(deleteFunction).toBeCalledWith('MY_KEY', '4')
      })
    })
  })
})
