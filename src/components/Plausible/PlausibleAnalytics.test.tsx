import React from 'react'
import { mount } from 'enzyme'
import PlausibleAnalytics from './PlausibleAnalytics'

describe('Component: PlausibleAnalytics', () => {
  const sharedProps = { domain: 'identity.rifos.org' }

  it('renders the component showing the content', () => {
    const wrapper = mount(<PlausibleAnalytics {...sharedProps} />)
    expect(wrapper).toBeDefined()

    expect(wrapper.find('#analytics')).toHaveLength(1)
    expect(wrapper.find('button')).toHaveLength(2)
  })

  it('hides the content if user has already specified', () => {
    localStorage.setItem('PLAUSIBLE_ID_MANAGER', 'GRANTED')

    const wrapperAccepted = mount(<PlausibleAnalytics {...sharedProps} />)
    expect(wrapperAccepted.find('#analytics')).toMatchObject({})

    localStorage.setItem('PLAUSIBLE_ID_MANAGER', 'DENIED')
    const wrapperDenied = mount(<PlausibleAnalytics {...sharedProps} />)
    expect(wrapperDenied.find('#analytics')).toMatchObject({})
  })
})
