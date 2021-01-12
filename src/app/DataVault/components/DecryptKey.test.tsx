import React from 'react'
import { mount } from 'enzyme'
import DecryptKey from './DecryptKey'

describe('Component: DecryptKey', () => {
  it('renders the component', () => {
    const wrapper = mount(<DecryptKey handleGetContent={jest.fn()} disabled={false} />)
    expect(wrapper).toBeDefined()
  })

  it('handles click', () => {
    const getContent = jest.fn()
    const wrapper = mount(<DecryptKey handleGetContent={getContent} disabled={false} />)
    wrapper.find('button').simulate('click')
    expect(getContent).toBeCalledTimes(1)
  })

  it('is disabled', () => {
    const wrapper = mount(<DecryptKey handleGetContent={jest.fn()} disabled={true} />)
    expect(wrapper.find('button').props().disabled).toBeTruthy()
  })
})
