import React from 'react'
import { shallow, mount } from 'enzyme'
import AddDeclarativeDetails from './AddDeclarativeDetails'

describe('Component: AddDeclarativeDetails', () => {
  it('renders the component', () => {
    const wrapper = shallow(<AddDeclarativeDetails addDeclarativeDetail={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('adds handles errors if type and content is empty', () => {
    const submitData = jest.fn()
    const wrapper = mount(<AddDeclarativeDetails addDeclarativeDetail={submitData} />)
    const button = wrapper.find('button.submit')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
    expect(wrapper.find('.alert.error').text()).toBe('Type and Content cannot be empty.')

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    expect(wrapper.find('input.type').props().value).toBe('email')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
  })
})
