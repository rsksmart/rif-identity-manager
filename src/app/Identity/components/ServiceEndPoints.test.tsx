import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import ServiceEndPoints from './ServiceEndPoints'

describe('Component: ServiceEndPoints', () => {
  it('renders the component', () => {
    const wrapper = mount(<ServiceEndPoints addEndpoint={jest.fn()} isOwner={true} />)
    expect(wrapper).toBeDefined()
  })

  it('displays a list of endpoints', () => {
    const endpoints = [
      { id: '1', type: 'Exchange', serviceEndpoint: 'https://theExchange' },
      { id: '2', type: 'Identity', serviceEndpoint: 'https://Identity' }
    ]
    const wrapper = mount(<ServiceEndPoints addEndpoint={jest.fn()} endpoints={endpoints} isOwner={true} />)

    expect(wrapper.find('.endpoint').first().text()).toBe('Exchange - https://theExchange')
    expect(wrapper.find('.endpoint').at(1).text()).toBe('Identity - https://Identity')
  })

  it('handles adding new service endpoint', async () => {
    const addEndpoint = jest.fn()
    const wrapper = mount(
      <ServiceEndPoints
        addEndpoint={(name: string, url: string, validity: number) => new Promise((resolve) => resolve(addEndpoint(name, url, validity)))}
        isOwner={true}
      />
    )

    wrapper.find('.panel-right').find('button').simulate('click')
    wrapper.find('input#name').simulate('change', { target: { value: 'test', id: 'name' } })
    wrapper.find('input#url').simulate('change', { target: { value: 'https://123', id: 'url' } })
    wrapper.find('input#validity').simulate('change', { target: { value: '600', id: 'validity' } })

    expect(wrapper.find('input#name').props().value).toBe('test')

    await act(async () => {
      wrapper.find('button.submit').simulate('click')
      expect(addEndpoint).toBeCalledWith('did/svc/test', 'https://123', 600)
    })
  })
})
