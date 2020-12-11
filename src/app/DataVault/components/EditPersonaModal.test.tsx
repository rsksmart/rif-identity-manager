import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import EditPersonaModal from './EditPersonaModal'

describe('Component: EditPersonaModal.test', () => {
  const initProps = {
    did: 'did:eth:rsk:0x1234567890',
    updatePersona: jest.fn(),
    initValue: {}
  }

  const initValues = {
    DD_NAME: [{ id: 'a156', content: 'First Last Name' }],
    DD_EMAIL: [{ id: 'b123', content: 'admin@iovlabs.org' }]
  }

  it('renders the component', () => {
    const wrapper = mount(<EditPersonaModal {...initProps} />)
    expect(wrapper).toBeDefined()
  })

  it('shows the modal when edit button is clicked', () => {
    const wrapper = mount(<EditPersonaModal {...initProps} />)
    expect(wrapper.find('.edit-personal-modal')).toMatchObject({})

    wrapper.find('button').simulate('click')

    expect(wrapper.find('.edit-personal-modal').find('h2').text()).toBe('Edit Persona')
  })

  it('sets the initial values', () => {
    const wrapper = mount(<EditPersonaModal did={initProps.did} updatePersona={jest.fn()} initValue={initValues} />)
    wrapper.find('button').simulate('click')

    expect(wrapper.find('input#name').props().value).toBe('First Last Name')
    expect(wrapper.find('input#email').props().value).toBe('admin@iovlabs.org')
  })

  it('edits content and returns the new values', async () => {
    const updateFunction = jest.fn()
    const updatePersona = (data: any) => new Promise((resolve) => resolve(updateFunction(data)))

    const wrapper = mount(<EditPersonaModal {...initProps} initValue={initValues} updatePersona={updatePersona} />)

    wrapper.find('button').simulate('click')

    wrapper.find('input#name').simulate('change', { target: { value: 'New Name' } })
    wrapper.find('input#email').simulate('change', { target: { value: '' } })

    await act(async () => {
      await wrapper.find('.save').first().simulate('click')
      expect(updateFunction).toBeCalledWith({
        DD_NAME: [{ id: 'a156', content: 'New Name' }],
        DD_EMAIL: [{ id: 'b123', content: '' }]
      })
    })
  })
})
