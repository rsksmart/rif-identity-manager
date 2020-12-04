import React from 'react'
import { mount } from 'enzyme'
import ProgressBar from './ProgressBar'

describe('Component: ProgressBar.test', () => {
  it('renders the component', () => {
    const wrapper = mount(<ProgressBar total={100} value={5} />)
    expect(wrapper).toBeDefined()
  })

  describe('returns correct progress bar width', () => {
    it('5 of 100', () => {
      const wrapper = mount(<ProgressBar total={100} value={5} />)
      expect(wrapper.find('.progress')).toBeDefined()
      expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '5%' })
    })

    it('26 of 150', () => {
      const wrapper = mount(<ProgressBar value={26} total={150} />)
      expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '18%' })
    })
  })

  it('returns 100% if thge total is higher than the value', () => {
    const wrapper = mount(<ProgressBar value={82} total={40} />)
    expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '100%' })
  })

  it('returns 0% if the value is 0', () => {
    const wrapper = mount(<ProgressBar value={0} total={40} />)
    expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '0%' })
  })

  it('shows a visual bar of 1% if the value is less than 1% but not 0', () => {
    const wrapper = mount(<ProgressBar value={1} total={1000} />)
    expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '1%' })
  })
})
