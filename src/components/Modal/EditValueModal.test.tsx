import React from 'react'
import { mount } from 'enzyme'
import EditValueModal from './EditValueModal'

describe('Component: EditValueModal.test', () => {
  it('renders the component', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('handles events', () => {
    const onClose = jest.fn()
    const onConfirm = jest.fn()
    const wrapper = mount(<EditValueModal show={true} onConfirm={onConfirm} onClose={onClose} />)

    wrapper.find('button.submit').simulate('click')
    expect(onConfirm).toBeCalledTimes(1)

    wrapper.find('button.close').simulate('click')
    expect(onClose).toBeCalledTimes(1)
  })

  it('starts with initial value for input', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} initValue="hello" />)
    expect(wrapper.find('input.line').props().value).toBe('hello')
  })

  it('starts with initial value for textarea', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} initValue="textarea hello" inputType="textarea" />)
    expect(wrapper.find('textarea.line').text()).toBe('textarea hello')
  })

  it('returns with new value', () => {
    const onConfirm = jest.fn()
    const wrapper = mount(<EditValueModal show={true} onConfirm={onConfirm} onClose={jest.fn()} />)

    wrapper.find('input.editable').simulate('change', { target: { value: 'new value' } })
    wrapper.find('button.submit').simulate('click')
    expect(onConfirm).toBeCalledWith('new value')
  })

  it('handles custom text string', () => {
    const strings = {
      title: 'title text',
      intro: 'intro text',
      label: 'label text',
      placeholder: 'placeholder text',
      submit: 'submit text'
    }

    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} strings={strings} />)

    expect(wrapper.find('.modal-title').at(0).text()).toBe('title text')
    expect(wrapper.find('p.intro-text').text()).toBe('intro text')
    expect(wrapper.find('label').text()).toBe('label text')
    expect(wrapper.find('input.editable').props().placeholder).toBe('placeholder text')
    expect(wrapper.find('button.submit').text()).toBe('submit text')
  })

  it('shows an error message', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} error="An Error Happened!" />)
    expect(wrapper.find('div.alert').text()).toBe('An Error Happened!')
  })

  it('disables the inputs when disabled', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} disabled={true} />)
    expect(wrapper.find('input.editable').props().disabled).toBeTruthy()
    expect(wrapper.find('button.submit').props().disabled).toBeTruthy()
  })

  it('displays a textarea instead of input', () => {
    const wrapper = mount(<EditValueModal show={true} onConfirm={jest.fn()} onClose={jest.fn()} inputType='textarea' />)
    expect(wrapper.find('.editable').type()).toBe('textarea')
  })
})
