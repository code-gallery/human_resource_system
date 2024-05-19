import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import WorkItemPreview from './WorkItemPreview'

describe('containers/LinkedinImport/WorkItemPreview', () => {
  let jsx
  let wrapper
  let props
  beforeEach(() => {
    const { store } = config
    props = {
      onUpdate: jest.fn(),
      key: 1,
      idx: 1,
      description: 'Description',
      startDate: 'October 2016',
      endDate: 'Present',
      jobTitle: 'Testiest Tester',
      organisation: 'APPII'
    }

    jsx = (
      <Provider store={store}>
        <Router>
          <WorkItemPreview {...props} />
        </Router>
      </Provider>
    )

    wrapper = renderer.create(jsx).toJSON()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('Unit tests', () => {
    let mounted
    beforeEach(() => {
      mounted = mount(jsx)
      props.onUpdate.mockReset()
    })

    it('calls update on change of position', () => {
      const input = mounted.find('.workitemPosition')
      input.simulate('change', {
        target: { value: 'test' }
      })

      expect(props.onUpdate).toBeCalledWith(1, 'position', 'test')
    })

    it('Calls update on selectAsyncChange', () => {
      const previewWrapper = shallow(<WorkItemPreview {...props} />)
      const e = {
        name: 'bob',
        id: 2
      }
      previewWrapper.instance().selectAsyncChange(e, 1, props.onUpdate)
      expect(props.onUpdate).toBeCalledWith(1, 'company', e.name)
      expect(props.onUpdate).toBeCalledWith(1, 'organisation_id', e.id)
      expect(props.onUpdate.mock.calls.length).toBe(2)
    })

    it('Calls update on selectAsyncBlur', () => {
      const previewWrapper = shallow(<WorkItemPreview {...props} />)
      const e = {
        target: {
          value: 'test'
        }
      }
      previewWrapper.instance().selectAsyncBlur(e, 1, props.onUpdate)
      expect(props.onUpdate).toBeCalledWith(1, 'company', e.target.value)
      expect(props.onUpdate).toBeCalledWith(1, 'organisation_id', null)
      expect(props.onUpdate.mock.calls.length).toBe(2)
    })
  })

})
