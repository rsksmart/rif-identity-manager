import React from 'react'
import { shallow, mount } from 'enzyme'
import AddDeclarativeDetails from './AddDeclarativeDetails'

describe('Component: AddDeclarativeDetails.test', () => {
  it('renders the component', () => {
    const wrapper = shallow(<AddDeclarativeDetails submitData={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('adds handles errors if type and content is empty', () => {
    const submitData = jest.fn()
    const wrapper = mount(<AddDeclarativeDetails submitData={submitData} />)
    const button = wrapper.find('button.blue')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
    expect(wrapper.find('div.error').text()).toBe('Type and Content cannot be empty.')

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    expect(wrapper.find('input.type').props().value).toBe('email')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
  })

  it('handles submit when content and type are submitted', () => {
    const submitData = jest.fn()
    const wrapper = mount(<AddDeclarativeDetails submitData={submitData} />)

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    wrapper.find('input.content').simulate('change', { target: { value: 'an email address' } })

    const button = wrapper.find('button.blue')
    button.simulate('click')

    expect(submitData).toBeCalledWith('email', 'an email address')
  })
})
