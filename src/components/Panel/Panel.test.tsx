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
})
