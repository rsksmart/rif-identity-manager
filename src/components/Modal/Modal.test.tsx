import React from 'react'
import { render, mount } from 'enzyme'
import Modal from './Modal'

describe('Component: Modal', () => {
  it('renders and is described', () => {
    const wrapper = render(<Modal show={true} onClose={jest.fn()}>Hello Modal</Modal>)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Hello Modal')
  })

  it('fires the button when closed', () => {
    const onClose = jest.fn()
    const wrapper = mount(<Modal show={true} onClose={onClose}>Hello Modal</Modal>)
    wrapper.find('button').simulate('click')
    expect(onClose).toBeCalledTimes(1)
  })

  it('has custom classname', () => {
    const onClose = jest.fn()
    const wrapper = mount(<Modal show={true} onClose={onClose} className="my-modal">Hello Modal</Modal>)

    expect(wrapper.props().className).toBe('my-modal')
  })

  it('displays an optional title', () => {
    const wrapper = mount(<Modal show={true} onClose={jest.fn()} title="My Modal">Hello Modal</Modal>)
    expect(wrapper.find('.modal-title').at(0).text()).toBe('My Modal')
  })
})
