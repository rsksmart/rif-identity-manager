import React from 'react'
import { mount } from 'enzyme'
import CredentialView from './CredentialView'

describe('Component: CredentialView', () => {
  const sampleJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  it('renders the component', () => {
    const wrapper = mount(<CredentialView jwt={sampleJwt} />)
    expect(wrapper).toBeDefined()
  })

  it('renders the correct JWT', () => {
    const wrapper = mount(<CredentialView jwt={sampleJwt} />)
    expect(wrapper.find('.alert')).toEqual({})

    const value = wrapper.find('textarea').props().defaultValue as string
    expect(JSON.parse(value)).toMatchObject({ sub: '1234567890', name: 'John Doe', iat: 1516239022 })

    wrapper.find('button.raw').simulate('click')
    expect(wrapper.find('div.raw').text()).toBe(sampleJwt)
  })

  it('handles poorly formatted JWT', () => {
    const wrapper = mount(<CredentialView jwt='Hello World!' />)
    expect(wrapper.find('.alert').text()).toBe('Could not decode credential!The raw data is displayed below.')
    expect(wrapper.find('div.raw').text()).toBe('Hello World!')
  })
})
