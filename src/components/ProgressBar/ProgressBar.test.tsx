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
      expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '17%' })
    })
  })

  it('returns 100% if thge total is higher than the value', () => {
    const wrapper = mount(<ProgressBar value={82} total={40} />)
    expect(wrapper.find('.progress').first().props().style).toMatchObject({ width: '100%' })
  })
})
