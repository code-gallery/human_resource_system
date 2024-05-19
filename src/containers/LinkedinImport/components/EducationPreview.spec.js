import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import config from 'store'
import EducationPreview from './EducationPreview'

describe('containers/LinkedinImport/EducationPreview', () => {
  let jsx
  let wrapper
  let props
  beforeAll(() => {
    const { store } = config
    props = {
      onUpdate: jest.fn(),
      key: 1,
      idx: 1,
      date: '2003 - 2006',
      degree: 'Masters in Testing',
      organisation: 'Testford University'
    }

    jsx = (
      <Provider store={store}>
        <Router>
          <EducationPreview {...props} />
        </Router>
      </Provider>
    )

    wrapper = renderer.create(jsx).toJSON()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('Mounted unit tests', () => {
    let mounted
    beforeEach(() => {
      mounted = mount(jsx)
      props.onUpdate.mockReset()
    })

    it('calls update on change', () => {
      const input = mounted.find('.educationitemDegree')
      input.simulate('change', {
        target: { value: 'test' }
      })

      expect(props.onUpdate).toBeCalledWith(1, 'degree', 'test')
    })

    it('calls update on blur', () => {
      const input = mounted.find('.educationitemDegree')
      input.simulate('focus').simulate('blur', {
        target: { value: 'test' }
      })

      expect(props.onUpdate.mock.calls.length).toBe(0)
    })

    it('Calls update on selectAsyncChange', () => {
      const previewWrapper = shallow(<EducationPreview {...props} />)
      const e = {
        name: 'Bob',
        id: 1
      }
      previewWrapper.instance().selectAsyncChange(e, 1, props.onUpdate)
      expect(props.onUpdate).toBeCalledWith(1, 'institution', e.name)
      expect(props.onUpdate).toBeCalledWith(1, 'organisation_id', e.id)
      expect(props.onUpdate.mock.calls.length).toBe(2)
    })

    it('Calls update on selectAsyncBlur', () => {
      const previewWrapper = shallow(<EducationPreview {...props} />)
      const e = {
        target: {
          value: 'test'
        }
      }
      previewWrapper.instance().selectAsyncBlur(e, 1, props.onUpdate)
      expect(props.onUpdate).toBeCalledWith(1, 'institution', e.target.value)
      expect(props.onUpdate).toBeCalledWith(1, 'organisation_id', null)
      expect(props.onUpdate.mock.calls.length).toBe(2)
    })
  })
})
