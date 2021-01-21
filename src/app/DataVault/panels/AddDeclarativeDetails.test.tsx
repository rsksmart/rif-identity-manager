import React from 'react'
import { shallow, mount } from 'enzyme'
import AddDeclarativeDetails from './AddDeclarativeDetails'
import { PROVIDERS } from '../../../ethrpc'

describe('Component: AddDeclarativeDetails', () => {
  it('renders the component', () => {
    const wrapper = shallow(<AddDeclarativeDetails addDeclarativeDetail={jest.fn()} providerName={PROVIDERS.METAMASK} />)
    expect(wrapper).toBeDefined()
  })

  it('adds handles errors if type and content is empty', () => {
    const submitData = jest.fn()
    const wrapper = mount(<AddDeclarativeDetails addDeclarativeDetail={submitData} providerName={PROVIDERS.METAMASK} />)
    const button = wrapper.find('button.submit')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
    expect(wrapper.find('.alert.error').text()).toBe('Type and Content cannot be empty.')

    wrapper.find('input.type').simulate('change', { target: { value: 'email' } })
    expect(wrapper.find('input.type').props().value).toBe('email')
    button.simulate('click')
    expect(submitData).toBeCalledTimes(0)
  })

  it('shows a warning message if not metamask', () => {
    const wrapper = mount(<AddDeclarativeDetails addDeclarativeDetail={jest.fn()} providerName={PROVIDERS.NIFTY} />)
    expect(wrapper.find('.alert.warning').find('h2').text()).toBe('Warning!')
  })
})
