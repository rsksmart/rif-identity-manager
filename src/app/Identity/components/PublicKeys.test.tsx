import React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import PublicKeys from './PublicKeys'

describe('Component: PublicKeys', () => {
  it('renders the component', () => {
    const wrapper = mount(<PublicKeys addKey={jest.fn()} isOwner={true} />)
    expect(wrapper).toBeDefined()
  })

  describe('sends the correct values', () => {
    const addEndpoint = jest.fn()
    const addKey = (type: string, value: string, validity: number) =>
      new Promise((resolve) => resolve(addEndpoint(type, value, validity)))
    const wrapper = mount(<PublicKeys addKey={addKey} isOwner={true} />)

    beforeEach(() => {
      wrapper.find('.panel-right').find('button').simulate('click')
      wrapper.find('textarea#value').simulate('change', { target: { value: 'value', id: 'value' } })
    })

    it('returns secp256k1/veriKey/hex (the defaults)', async () => {
      await act(async () => {
        wrapper.find('button.submit').simulate('click')
        expect(addEndpoint).toBeCalledWith('did/pub/secp256k1/veriKey/hex', 'value', 86400)
      })
    })

    it('returns did/pub/Ed25519/sigAuth/base64', async () => {
      wrapper.find('select#algorithm').simulate('change', { target: { value: 'Ed25519', id: 'algorithm' } })
      wrapper.find('select#purpose').simulate('change', { target: { value: 'sigAuth', id: 'purpose' } })
      wrapper.find('select#encoding').simulate('change', { target: { value: 'base64', id: 'encoding' } })

      await act(async () => {
        wrapper.find('button.submit').simulate('click')
        expect(addEndpoint).toBeCalledWith('did/pub/Ed25519/sigAuth/base64', 'value', 86400)
      })
    })

    it('returns correct value and validity', async () => {
      wrapper.find('input#validity').simulate('change', { target: { value: '60', id: 'validity' } })
      wrapper.find('textarea#value').simulate('change', { target: { value: 'updatedValue', id: 'value' } })

      await act(async () => {
        wrapper.find('button.submit').simulate('click')
        expect(addEndpoint).toBeCalledWith('did/pub/secp256k1/veriKey/hex', 'updatedValue', 60)
      })
    })
  })
})
