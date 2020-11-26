import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import AddDeclarativeDetails from './AddDeclarativeDetails'

describe('Component: AddDeclarativeDetails.test', () => {
  it('renders the component', () => {
    const wrapper = shallow(<AddDeclarativeDetails submitData={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('adds handles errors if type and content is empty', () => {
    const submitData = jest.fn()
    const wrapper = mount(<AddDeclarativeDetails submitData={submitData} />)
    const button = wrapper.find('button.submit')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
    expect(wrapper.find('.alert.error').text()).toBe('Type and Content cannot be empty.')

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    expect(wrapper.find('input.type').props().value).toBe('email')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
  })

  it('handles submit when content and type are submitted', async () => {
    const submitData = jest.fn(() => new Promise((resolve) => resolve(true)))

    const wrapper = mount(<AddDeclarativeDetails submitData={submitData} />)

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    wrapper.find('textarea').simulate('change', { target: { value: 'an email address' } })

    expect(wrapper.find('input.type').props().value).toBe('email')
    expect(wrapper.find('textarea').props().value).toBe('an email address')

    const button = wrapper.find('button.submit')

    await act(async () => {
      await button.simulate('click')
      expect(submitData).toBeCalledWith('email', 'an email address')
    })
  })
})
