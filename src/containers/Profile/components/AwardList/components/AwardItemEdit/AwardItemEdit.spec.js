import React from 'react'
import { shallow } from 'enzyme'
import AwardForm from './components/Forms/AwardForm'
import CPDForm from './components/Forms/CPDForm'
import CertificateForm from './components/Forms/CertificateForm'
import AchievementForm from './components/Forms/AchievementForm'
import ProjectForm from './components/Forms/ProjectForm'
import SkillForm from './components/Forms/SkillForm'
import LanguageForm from './components/Forms/LanguageForm'
import AwardItemEdit from './AwardItemEdit'

describe('containers/Profile/components/.../AwardItemEdit', () => {
  const commonProps = {
    saveAward: jest.fn(),
    deleteAward: jest.fn(),
    toggleEdit: jest.fn(),
    id: 3,
    name: 'Test name',
    organisation: 'Company Inc',
    verified_status: 'verified',
    pending_verification: false,
    award_id: null,
    visibility: 'registered',
    description: 'Lorem ipsum',
    date: '2016-03-01T00:00:00.000Z',
    awardType: 'award',
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
        <AwardItemEdit {...props} />
      )
    })

    describe('render', () => {
      describe('when type = award', () => {
        it('returns <AwardForm />', () => {
          wrapper.setProps({
            awardType: 'award'
          })
          expect(wrapper.find(AwardForm).length).toEqual(1)
        })
      })

      describe('when type = cpd', () => {
        it('returns <CPDForm />', () => {
          wrapper.setProps({
            awardType: 'cpd'
          })
          expect(wrapper.find(CPDForm).length).toEqual(1)
        })
      })

      describe('when type = certificate', () => {
        it('returns <CertificateForm />', () => {
          wrapper.setProps({
            awardType: 'certificate'
          })
          expect(wrapper.find(CertificateForm).length).toEqual(1)
        })
      })

      describe('when type = achievement', () => {
        it('returns <AchievementForm />', () => {
          wrapper.setProps({
            awardType: 'achievement'
          })
          expect(wrapper.find(AchievementForm).length).toEqual(1)
        })
      })

      describe('when type = project', () => {
        it('returns <ProjectForm />', () => {
          wrapper.setProps({
            awardType: 'project'
          })
          expect(wrapper.find(ProjectForm).length).toEqual(1)
        })
      })

      describe('when type = skill', () => {
        it('returns <ProjectForm />', () => {
          wrapper.setProps({
            awardType: 'skill'
          })
          expect(wrapper.find(SkillForm).length).toEqual(1)
        })
      })

      describe('when type = language', () => {
        it('returns <LanguageForm />', () => {
          wrapper.setProps({
            awardType: 'language'
          })
          expect(wrapper.find(LanguageForm).length).toEqual(1)
        })
      })
    })

    describe('renderForm', () => {
      describe('when cannot match awardType', () => {
        it('returns null', () => {
          expect(wrapper.instance().renderForm()).toEqual(null)
        })
      })
    })

    describe('orgRegistered', () => {
      it('updates state correctly', () => {
        expect(wrapper.state('orgRegistered')).toEqual(true)
        wrapper.instance().orgRegistered(false)
        expect(wrapper.state('orgRegistered')).toEqual(false)
      })
    })

    describe('onFieldsChange', () => {
      it('updates state correctly', () => {
        wrapper.instance().onFieldsChange({ description: 'hello world', visibility: 'private' })
        expect(wrapper.state('data')).toEqual(expect.objectContaining({
          id: 3,
          verified_status: 'verified',
          pending_verification: false,
          description: 'hello world',
          visibility: 'private'
        }))
      })
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

    describe('deleteAward', () => {
      beforeEach(() => {
        wrapper.instance().deleteAward()
      })

      it('calls props.deleteAward correctly', () => {
        expect(props.deleteAward).toHaveBeenCalledWith(3, 'award')
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

    describe('saveVerified', () => {
      it('calls props.saveAward correctly', () => {
        const data = wrapper.state('data')
        wrapper.setState({
          data: {
            ...data,
            verified: true,
            verified_status: 'verified',
            visibility: 'private'
          }
        })
        wrapper.instance().saveVerified()
        expect(props.saveAward).toHaveBeenCalledWith({
          id: 3,
          verified: true,
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
              name: void 0,
              description: void 0
            }
          })
          wrapper.instance().saveAndVerify(true)
          expect(wrapper.state('invalidFields')).toEqual([ 'name', 'description' ])
        })

        describe('when date validation fails', () => {
          describe('when awardType = "cpd"', () => {
            it('state.invalidDates = true', () => {
              const data = wrapper.state('data')
              wrapper.setProps({ awardType: 'cpd' })
              wrapper.setState({
                data: {
                  ...data,
                  cpd_type: 'cpd_type',
                  location: 'London',
                  duration: 'duration',
                  date_from: '2016-06-01T00:00:00.000Z',
                  date_to: '2016-03-01T00:00:00.000Z'
                }
              })
              wrapper.instance().saveAndVerify(true)
              expect(wrapper.state('invalidDates')).toEqual(true)
            })
          })

          describe('when awardType = "project"', () => {
            it('state.invalidDates = true', () => {
              const data = wrapper.state('data')
              wrapper.setProps({ awardType: 'project' })
              wrapper.setState({
                data: {
                  ...data,
                  date_from: '2016-06-01T00:00:00.000Z',
                  date_to: '2016-03-01T00:00:00.000Z'
                }
              })
              wrapper.instance().saveAndVerify(true)
              expect(wrapper.state('invalidDates')).toEqual(true)
            })
          })
        })
      })

      describe('when validation passes', () => {
        describe('when awardType = "cpd"', () => {
          beforeEach(() => {
            const data = wrapper.state('data')
            wrapper.setProps({ awardType: 'cpd' })
            wrapper.setState({
              data: {
                ...data,
                cpd_type: 'cpd_type',
                location: 'London',
                duration: 'duration',
                date_from: '2016-06-01T00:00:00.000Z',
                date_to: '2016-06-01T00:00:00.000Z'
              }
            })
            wrapper.instance().saveAndVerify(true)
          })

          it('calls props.saveAward correctly', () => {
            expect(props.saveAward).toHaveBeenCalledWith(expect.objectContaining({
              id: 3,
              cpd_type: 'cpd_type',
              location: 'London',
              duration: 'duration',
              type: 'cpd'
            }), true)
          })

          it('calls props.toggleEdit correctly', () => {
            expect(props.toggleEdit).toHaveBeenCalled()
          })
        })

        describe('when awardType = "project"', () => {
          beforeEach(() => {
            const data = wrapper.state('data')
            wrapper.setProps({ awardType: 'project' })
            wrapper.setState({
              data: {
                ...data,
                date_from: '2016-06-01T00:00:00.000Z',
                date_to: '2016-06-01T00:00:00.000Z'
              }
            })
            wrapper.instance().saveAndVerify(true)
          })

          it('calls props.saveAward correctly', () => {
            expect(props.saveAward).toHaveBeenCalledWith(expect.objectContaining({
              id: 3,
              type: 'project'
            }), true)
          })

          it('calls props.toggleEdit correctly', () => {
            expect(props.toggleEdit).toHaveBeenCalled()
          })
        })

        describe('when awardType = "award"', () => {
          beforeEach(() => {
            wrapper.instance().saveAndVerify(true)
          })

          it('calls props.saveAward correctly', () => {
            expect(props.saveAward).toHaveBeenCalledWith(expect.objectContaining({
              id: 3,
              name: 'Test name',
              type: 'award'
            }), true)
          })

          it('calls props.toggleEdit correctly', () => {
            expect(props.toggleEdit).toHaveBeenCalled()
          })
        })
      })
    })
  })
})
