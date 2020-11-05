import React from 'react'
import { shallow } from 'enzyme'
import { BaseButton } from './Buttons'

describe('Component: Button', () => {
  it('renders and is defined', () => {
    const wrapper = shallow(<BaseButton>hello button</BaseButton>)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('hello button')
  })

  it('handles click events', () => {
    const fn = jest.fn()
    const wrapper = shallow(<BaseButton onClick={fn}>click me</BaseButton>)
    expect(fn).toBeCalledTimes(0)

    wrapper.simulate('click')
    expect(fn).toBeCalledTimes(1)
  })
})
