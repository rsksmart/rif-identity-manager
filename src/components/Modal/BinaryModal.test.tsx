import React from 'react'
import { mount } from 'enzyme'
import BinaryModal from './BinaryModal'

describe('Component: BinaryModal', () => {
  it('renders the component with default text', () => {
    const wrapper = mount(<BinaryModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} />)
    expect(wrapper).toBeDefined()

    expect(wrapper.find('p').text()).toBe('Are you sure?')
    expect(wrapper.find('button.deny').text()).toBe('Deny')
    expect(wrapper.find('button.confirm').text()).toBe('Confirm')
  })

  it('handles click events', () => {
    const onConfirm = jest.fn()
    const onClose = jest.fn()
    const wrapper = mount(<BinaryModal show={true} onConfirm={onConfirm} onClose={onClose} />)

    wrapper.find('button.deny').simulate('click')
    expect(onClose).toBeCalledTimes(1)

    wrapper.find('button.confirm').simulate('click')
    expect(onConfirm).toBeCalledTimes(1)
  })

  it('can have custom text', () => {
    const strings = {
      text: 'the text',
      confirm: 'yes',
      deny: 'no'
    }
    const wrapper = mount(<BinaryModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} strings={strings} />)

    expect(wrapper.find('p').text()).toBe(strings.text)
    expect(wrapper.find('button.deny').text()).toBe(strings.deny)
    expect(wrapper.find('button.confirm').text()).toBe(strings.confirm)
  })

  it('handles onDeny button function if it is provided', () => {
    const onClose = jest.fn()
    const onDeny = jest.fn()
    const wrapper = mount(<BinaryModal show={true} onConfirm={jest.fn()} onClose={onClose} onDeny={onDeny} />)

    wrapper.find('button.deny').simulate('click')
    expect(onClose).toBeCalledTimes(0)
    expect(onDeny).toBeCalledTimes(1)
  })
})
