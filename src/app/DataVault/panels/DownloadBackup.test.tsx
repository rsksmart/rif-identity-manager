import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DownloadBackup from './DownloadBackup'

describe('Component: DownloadBackup', () => {
  it('renders the component', () => {
    const wrapper = mount(<DownloadBackup handleDownload={jest.fn()} />)
    expect(wrapper).toBeDefined()
  })

  it('handles download click', async () => {
    const download = jest.fn()
    const wrapper = mount(<DownloadBackup handleDownload={() => Promise.resolve(download())} />)

    await act(async () => {
      await wrapper.find('button').simulate('click')
      expect(download).toBeCalledTimes(1)
    })
  })

  it('shows an error', async () => {
    const wrapper = mount(<DownloadBackup handleDownload={() => Promise.reject(new Error('An Error'))} />)

    await act(async () => {
      await wrapper.find('button').simulate('click')
    })

    wrapper.update()
    expect(wrapper.find('div.alert').text()).toBe('An Error')
  })
})
