import React from 'react'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import WorkItemEdit from './index'

configure({adapter: new Adapter()});
describe('containers/Profile/components/.../WorkItemEdit', () => {
  const commonProps = {
    id: 3,
    start_date: '2017-08-01T00:00:00.000Z',
    end_date: '0000-00-00',
    verified_status: 'verified',
    org: {
      id: 55,
      name: 'Applied Blockchain',
      logo_image: '//logo_image'
    },
    industries: [
      { text: 'Accounting' },
      { text: 'Animation' },
      { text: 'IT' }
    ],
    toggleEdit: jest.fn(),
    deleteWork: jest.fn(),
    saveEntity: jest.fn(),
    visibility: 'registered',
    user: {
      mobile_address: '',
      biometrics_status: ''
    }
  }

  describe('when props.edit = false', () => {
    let props
    let wrapper

    beforeEach(() => {
      props = {
        ...commonProps,
        edit: false
      }

      wrapper = shallow(
        <WorkItemEdit {...props} />
      )
    })

    describe('onFieldChange', () => {
      it('updates state correctly', () => {
        wrapper.instance().onFieldChange('position', 'Front end dev')
        expect(wrapper.state('data')).toEqual(expect.objectContaining({
          id: 3,
          verified_status: 'verified',
          position: 'Front end dev',
          visibility: 'registered'
        }))
      })
    })

    describe('deleteWork', () => {
      beforeEach(() => {
        wrapper.instance().deleteWork()
      })

      it('calls props.deleteWork correctly', () => {
        expect(props.deleteWork).toHaveBeenCalledWith(3)
      })

      it('calls props.toggleEdit correctly', () => {
        expect(props.toggleEdit).toHaveBeenCalled()
      })
    })

    describe('toggleLock', () => {
      it('updates state correctly', () => {
        wrapper.instance().toggleLock({ preventDefault: jest.fn() })
        expect(wrapper.state('locked')).toEqual(false)
      })
    })

    describe('switchMode', () => {
      it('updates state correctly', () => {
        expect(wrapper.state('mode')).toEqual('uni')
        wrapper.instance().switchMode({ preventDefault: jest.fn() })
        expect(wrapper.state('mode')).toEqual('school')
        wrapper.instance().switchMode({ preventDefault: jest.fn() })
        expect(wrapper.state('mode')).toEqual('uni')
      })
    })

    describe('saveVerified', () => {
      it('calls props.saveEntity correctly', () => {
        const data = wrapper.state('data')
        wrapper.setState({
          data: {
            ...data,
            entity_type: 'jobs',
            verified: true,
            verified_status: 'verified',
            visibility: 'private'
          }
        })
        wrapper.instance().saveVerified()
        expect(props.saveEntity).toHaveBeenCalledWith({
          id: 3,
          verified: true,
          entity_type: 'jobs',
          verified_status: 'verified',
          visibility: 'private'
        }, 'verified')
      })
    })

    describe('saveAndVerify', () => {
      describe('when validation fails', () => {
        it('state.invalidFields is correct', () => {
          const data = wrapper.state('data')
          wrapper.setState({
            data: {
              ...data,
              position: 'Front end',
              company: void 0,
              industry: void 0,
              start_date: void 0
            }
          })
          wrapper.instance().saveAndVerify(true)
          expect(wrapper.state('invalidFields'))
            .toEqual([ 'company', 'industry', 'start_date' ])
        })

        describe('when date validation fails', () => {
          it('state.invalidDates = true', () => {
            const data = wrapper.state('data')
            wrapper.setState({
              data: {
                ...data,
                company: 'Applied Blockchain',
                industry: 'IT',
                position: 'Front end',
                start_date: '2016-06-01T00:00:00.000Z',
                end_date: '2016-03-01T00:00:00.000Z'
              }
            })
            wrapper.instance().saveAndVerify(true)
            expect(wrapper.state('invalidDates')).toEqual(true)
          })
        })
      })

      describe('when validation passes', () => {
        beforeEach(() => {
          const data = wrapper.state('data')
          wrapper.setProps({ awardType: 'cpd' })
          wrapper.setState({
            data: {
              ...data,
              company: 'Applied Blockchain',
              industry: 'IT',
              position: 'Front end',
              start_date: '2016-06-01T00:00:00.000Z',
              end_date: '2016-06-01T00:00:00.000Z'
            }
          })
          wrapper.instance().saveAndVerify(true)
        })

        it('calls props.saveEntity correctly', () => {
          expect(props.saveEntity).toHaveBeenCalledWith(expect.objectContaining({
            id: 3,
            company: 'Applied Blockchain',
            industry: 'IT',
            position: 'Front end',
            start_date: '2016-06-01',
            end_date: '2016-06-02'
          }), true)
        })

        it('calls props.toggleEdit correctly', () => {
          expect(props.toggleEdit).toHaveBeenCalled()
        })
      })
    })
  })
})
