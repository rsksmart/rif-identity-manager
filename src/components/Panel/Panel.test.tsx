import React from 'react'
import { render } from 'enzyme'
import Panel from './Panel'

describe('Component: Panel', () => {
  it('renders and is described', () => {
    const wrapper = render(<Panel>Hello Panel</Panel>)
    expect(wrapper).toBeDefined()
    expect(wrapper.text()).toBe('Hello Panel')
  })

  it('renders a title', () => {
    const wrapper = render(<Panel title="hello">Hello Panel</Panel>)
    expect(wrapper.find('.panel-header').text()).toBe('hello')
  })

  it('has a custom classname', () => {
    const cta = <p>call to action</p>
    const wrapper = render(<Panel headerRight={cta}>Hello Panel</Panel>)
    expect(wrapper.find('.panel-right')).toBeDefined()
    expect(wrapper.find('.panel-right').text()).toBe('call to action')
  })
})
