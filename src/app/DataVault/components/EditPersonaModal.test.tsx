import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import EditPersonaModal from './EditPersonaModal'

describe('Component: EditPersonaModal.test', () => {
  const emptyItem = [{ id: '', content: '' }]
  const initProps = {
    did: 'did:eth:rsk:0x1234567890',
    updatePersona: jest.fn(),
    initValue: {
      DD_NAME: emptyItem,
      DD_EMAIL: emptyItem,
      DD_ADDRESS: emptyItem,
      DD_IDNUMBER: emptyItem,
      DD_PHONE: emptyItem,
      DD_BIRTHDATE: emptyItem
    }
  }

  const initValues = {
    DD_NAME: [{ id: 'a156', content: 'First Last Name' }],
    DD_EMAIL: [{ id: 'b123', content: 'admin@iovlabs.org' }],
    DD_ADDRESS: [{ id: 'c180', content: '123 Fake St.' }],
    DD_IDNUMBER: [{ id: 'd234', content: 'CY5006480' }],
    DD_PHONE: [{ id: 'e580', content: '123-545-8808' }],
    DD_BIRTHDATE: [{ id: 'f480', content: '01/01/2020' }]
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
    expect(wrapper.find('input#address').props().value).toBe('123 Fake St.')
    expect(wrapper.find('input#idnumber').props().value).toBe('CY5006480')
    expect(wrapper.find('input#phone').props().value).toBe('123-545-8808')
    expect(wrapper.find('input#birthdate').props().value).toBe('01/01/2020')
  })

  it('edits content and returns the new values', async () => {
    const updateFunction = jest.fn()
    const updatePersona = (data: any) => new Promise((resolve) => resolve(updateFunction(data)))

    const wrapper = mount(<EditPersonaModal {...initProps} initValue={initValues} updatePersona={updatePersona} />)

    wrapper.find('button').simulate('click')

    wrapper.find('input#name').simulate('change', { target: { value: 'New Name', id: 'name' } })
    wrapper.find('input#email').simulate('change', { target: { value: '', id: 'email' } })
    wrapper.find('input#address').simulate('change', { target: { value: 'new address', id: 'address' } })
    wrapper.find('input#idnumber').simulate('change', { target: { value: 'CY500', id: 'idnumber' } })
    wrapper.find('input#phone').simulate('change', { target: { value: '357-222222', id: 'phone' } })
    wrapper.find('input#birthdate').simulate('change', { target: { value: '02/02/2020', id: 'birthdate' } })

    await act(async () => {
      await wrapper.find('.save').first().simulate('click')
      expect(updateFunction).toBeCalledWith({
        DD_NAME: [{ id: 'a156', content: 'New Name' }],
        DD_EMAIL: [{ id: 'b123', content: '' }],
        DD_ADDRESS: [{ id: 'c180', content: 'new address' }],
        DD_IDNUMBER: [{ id: 'd234', content: 'CY500' }],
        DD_PHONE: [{ id: 'e580', content: '357-222222' }],
        DD_BIRTHDATE: [{ id: 'f480', content: '02/02/2020' }]
      })
    })
  })

  it('does not return the values if they are the same', async () => {
    const updateFunction = jest.fn()
    const updatePersona = (data: any) => new Promise((resolve) => resolve(updateFunction(data)))

    const wrapper = mount(<EditPersonaModal {...initProps} initValue={initValues} updatePersona={updatePersona} />)

    wrapper.find('button').simulate('click')

    await act(async () => {
      await wrapper.find('.save').first().simulate('click')
      expect(updateFunction).toBeCalledWith({
        DD_NAME: [],
        DD_EMAIL: [],
        DD_ADDRESS: [],
        DD_IDNUMBER: [],
        DD_PHONE: [],
        DD_BIRTHDATE: []
      })
    })
  })
})
