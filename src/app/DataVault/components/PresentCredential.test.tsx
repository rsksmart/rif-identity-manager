import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import PresentCredential from './PresentCredential'

describe('Component: PresentCredential.test', () => {
  const jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRW1haWwiXSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6ImRpZDpldGhyOnJzazoweDhhMzJkYTYyNGRkOWZhZDhiZjRmMzJkOTQ1NmYzNzRiNjBkOWFkMjg7aWQ9MWViMmFmNmItMGRlZS02MDkwLWNiNTUtMGVkMDkzZjliMDI2O3ZlcnNpb249MS4wIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImVtYWlsQWRkcmVzcyI6Implc3NlQGlvdmxhYnMub3JnIn19LCJzdWIiOiJkaWQ6ZXRocjpyc2s6dGVzdG5ldDoweDNkZDAzZDdkNmMzMTM3ZjFlYjc1ODJiYTU5NTdiOGEyZTI2ZjMwNGEiLCJuYmYiOjE2MDgyMjExNDAsImlzcyI6ImRpZDpldGhyOnJzazoweEZjYzdlNjkxYjNiNjMxODI5Qzk2NDkwNTY5YWE1RjFFMzFlRkFmOGYifQ.omtFUQRGazaMBMkmzHX_X5WaU0qu_fRD8eux_E7nDjrxGXtAKxm-vZioHJdvd7BFF1oQuvzSue7aSVxf5osSIg'
  const initProps = {
    jwt,
    createPresentation: jest.fn()
  }

  it('renders the component', () => {
    const wrapper = mount(<PresentCredential {...initProps} />)
    expect(wrapper).toBeDefined()
  })

  it('creates a dummy presentation', async () => {
    const create = jest.fn()
    const handleCreate = (input: string) => {
      create(input)
      return Promise.resolve('thePresentation')
    }

    const wrapper = mount(<PresentCredential jwt="testJwt" createPresentation={handleCreate} />)

    await act(async () => {
      await wrapper.find('button').simulate('click')
      expect(create).toBeCalledWith('testJwt')
      wrapper.update()

      await act(async () => {
        expect(wrapper.find('h2').text()).toBe('Raw JWT')
        expect(wrapper.find('textarea').props().defaultValue).toBe('thePresentation')
      })
    })
  })

  it('returns an error', async () => {
    const handleCreate = (_input: string) => Promise.reject(new Error('Custom Error'))
    const wrapper = mount(<PresentCredential jwt="testJwt" createPresentation={handleCreate} />)

    await wrapper.find('button').simulate('click')
    await act(async () => {
      await wrapper.update()
      await act(async () => {
        wrapper.update()
        expect(wrapper.find('.alert').text()).toBe('Custom Error')
      })
    })
  })
})
