import React from 'react'
import { shallow } from 'enzyme'
import EducationItemEdit from './EducationItemEdit'

describe('containers/Profile/components/.../EducationItemEdit', () => {
  const commonProps = {
    saveEntity: jest.fn(),
    deleteEducation: jest.fn(),
    toggleEdit: jest.fn(),
    id: 3,
    organisation_id: 45,
    name: 'Test name',
    institution: 'Company Inc',
    verified_status: 'verified',
    pending_verification: false,
    visibility: 'registered',
    description: 'Lorem ipsum',
    date: '2016-03-01T00:00:00.000Z',
    degree: 'MSc',
    grade: 'A',
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
        type: 'secondary',
        edit: false
      }

      wrapper = shallow(
        <EducationItemEdit {...props} />
      )
    })

    describe('onFieldChange', () => {
      it('updates state correctly', () => {
        wrapper.instance().onFieldChange('description', 'hello world')
        expect(wrapper.state('data')).toEqual(expect.objectContaining({
          id: 3,
          verified_status: 'verified',
          pending_verification: false,
          description: 'hello world',
          visibility: 'registered'
        }))
      })
    })

    describe('deleteEducation', () => {
      beforeEach(() => {
        wrapper.instance().deleteEducation()
      })

      it('calls props.deleteEducation correctly', () => {
        expect(props.deleteEducation).toHaveBeenCalledWith(3)
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
        wrapper.instance().switchMode({ preventDefault: jest.fn() })
        expect(wrapper.state('mode')).toEqual('uni')
        wrapper.instance().switchMode({ preventDefault: jest.fn() })
        expect(wrapper.state('mode')).toEqual('school')
      })
    })

    describe('saveVerified', () => {
      it('calls props.saveEntity correctly', () => {
        const data = wrapper.state('data')
        wrapper.setState({
          data: {
            ...data,
            entity_type: 'educations',
            verified: true,
            verified_status: 'verified',
            visibility: 'private'
          }
        })
        wrapper.instance().saveVerified()
        expect(props.saveEntity).toHaveBeenCalledWith({
          id: 3,
          verified: true,
          entity_type: 'educations',
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
              institution: void 0,
              description: void 0,
              results: []
            }
          })
          wrapper.instance().saveAndVerify(true)
          expect(wrapper.state('invalidFields'))
            .toEqual([ 'institution', 'start_date' ])
        })

        describe('when date validation fails', () => {
          it('state.invalidDates = true', () => {
            const data = wrapper.state('data')
            wrapper.setState({
              data: {
                ...data,
                results: [],
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
              results: [],
              start_date: '2016-06-01T00:00:00.000Z',
              end_date: '2016-06-01T00:00:00.000Z'
            }
          })
          wrapper.instance().saveAndVerify(true)
        })

        it('calls props.saveAward correctly', () => {
          expect(props.saveEntity).toHaveBeenCalledWith(expect.objectContaining({
            id: 3,
            results: [],
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
