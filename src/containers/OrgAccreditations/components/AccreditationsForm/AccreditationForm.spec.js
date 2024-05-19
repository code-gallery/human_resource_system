import React from 'react'
import { shallow } from 'enzyme'
import Awards from '../Forms/Awards'
import Achievements from '../Forms/Achievements'
import Certificates from '../Forms/Certificates'
import Cpd from '../Forms/Cpd'
import AccreditationsForm from './AccreditationsForm'

describe('containers/OrgAccreditations/components/AccreditationsForm', () => {
  let wrapper
  let props
  const commonProps = {
    orgAccreditations: {
      pending: 'fetchSuccess',
      awardTypes: {
        achievement: {
          label: 'Achievements',
          fields: { name: true, description: true, grade: true, date: true },
          qrcode: true
        },
        award: {
          label: 'Awards',
          fields: { name: true, description: true, organisation: true, organisation_id: true, date: true },
          qrcode: true
        },
        certificate: {
          label: 'Certificates',
          fields: {
            name: true, description: true, grade: true, date: true,
            organisation: true, organisation_id: true, level: true, file: true
          },
          qrcode: true
        },
        cpd: {
          label: 'Professional Development (CPD)',
          fields: {
            name: true, description: true, location: true, date_from: true, date_to: true,
            organisation: true, organisation_id: true, level: true, file: true, duration: true,
            cpd_type: true, cpd_credits: true
          },
          qrcode: true
        }
      }
    },
    save: jest.fn(),
    cancel: jest.fn()
  }

  describe('create new accreditation', () => {
    beforeEach(() => {
      props = {
        ...commonProps,
        editMode: false
      }
      wrapper = shallow(
        <AccreditationsForm {...props} />
      )
      props.save.mockReset()
      props.cancel.mockReset()
    })

    describe('componentWillReceiveProps', () => {
      describe('when saveSuccess', () => {
        it('calls props.cancel', () => {
          wrapper.setProps({
            orgAccreditations: {
              ...commonProps.orgAccreditations,
              pending: 'saveSuccess'
            }
          })
          expect(props.cancel).toHaveBeenCalled()
        })
      })
    })

    describe('when "award_type" is not valid', () => {
      it('renderForm returns null', () => {
        expect(wrapper.instance().renderForm()).toEqual(null)
      })
    })

    describe('when "award_type" = "achievement"', () => {
      it('renders <Achievements />', () => {
        wrapper.setState({ award_type: 'achievement' })
        expect(wrapper.find(Achievements).length).toEqual(1)
      })
    })

    describe('when "award_type" = "award"', () => {
      it('renders <Awards />', () => {
        wrapper.setState({ award_type: 'award' })
        expect(wrapper.find(Awards).length).toEqual(1)
      })
    })

    describe('when "award_type" = "certificate"', () => {
      it('renders <Certificates />', () => {
        wrapper.setState({ award_type: 'certificate' })
        expect(wrapper.find(Certificates).length).toEqual(1)
      })
    })

    describe('when "award_type" = "cpd"', () => {
      it('renders <Cpd />', () => {
        wrapper.setState({ award_type: 'cpd' })
        expect(wrapper.find(Cpd).length).toEqual(1)
      })
    })

    describe('cancel', () => {
      it('calls props.cancel', () => {
        wrapper.instance().cancel()
        expect(props.cancel).toHaveBeenCalled()
      })
    })

    describe('save', () => {
      describe('when "award_type" = "award"', () => {
        it('calls props.save correctly', () => {
          wrapper.setState({
            name: 'Test name 1',
            award_type: 'award',
            award_date: '2016-04-09',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            award_data: {
              hello: 'world'
            },
            type: 'type'
          })
          wrapper.instance().save()
          expect(props.save).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test name 1',
            award_type: 'award',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            type: 'type',
            award_data: {
              name: 'Test name 1',
              date: '2016-04-09'
            },
            lat: null,
            lng: null,
            radius: null,
            location: '',
            start_time: '00:00',
            end_time: '00:00'
          }))
        })
      })

      describe('when "award_type" = "certificate"', () => {
        it('calls props.save correctly', () => {
          wrapper.setState({
            name: 'Test name 2',
            award_type: 'certificate',
            award_date: '2016-04-09',
            level: 'Level 1',
            award_grade: 'grade',
            award_file: 'file',
            delivery_type: 'Online',
            enabled: 1,
            award_data: {
              hello: 'world'
            },
            type: 'type'
          })
          wrapper.instance().save()
          expect(props.save).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test name 2',
            award_type: 'certificate',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            type: 'type',
            award_data: {
              name: 'Test name 2',
              date: '2016-04-09',
              grade: 'grade',
              file: 'file'
            },
            lat: null,
            lng: null,
            radius: null,
            location: '',
            start_time: '00:00',
            end_time: '00:00'
          }))
        })
      })

      describe('when "award_type" = "achievement"', () => {
        it('calls props.save correctly', () => {
          wrapper.setState({
            name: 'Test name 3',
            award_type: 'achievement',
            award_date: '2016-04-09',
            level: 'Level 1',
            award_grade: 'grade',
            delivery_type: 'Online',
            enabled: 1,
            award_data: {
              hello: 'world'
            },
            type: 'type'
          })
          wrapper.instance().save()
          expect(props.save).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test name 3',
            award_type: 'achievement',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            type: 'type',
            award_data: {
              name: 'Test name 3',
              date: '2016-04-09',
              grade: 'grade'
            },
            lat: null,
            lng: null,
            radius: null,
            location: '',
            start_time: '00:00',
            end_time: '00:00'
          }))
        })
      })

      describe('when "award_type" = "cpd"', () => {
        it('calls props.save correctly', () => {
          wrapper.setState({
            name: 'Test name 3',
            award_type: 'cpd',
            award_cpd_type: 'Informal',
            award_duration: '30mins',
            award_file: 'file',
            award_cpd_credits: 'cpd_credits',
            award_date_from: '2016-04-09',
            award_date_to: '2016-04-11',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            award_data: {
              hello: 'world'
            },
            type: 'type'
          })
          wrapper.instance().save()
          expect(props.save).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test name 3',
            award_type: 'cpd',
            level: 'Level 1',
            delivery_type: 'Online',
            enabled: 1,
            type: 'type',
            award_data: {
              name: 'Test name 3',
              duration: '30mins',
              file: 'file',
              cpd_type: 'Informal',
              cpd_credits: 'cpd_credits',
              date_from: '2016-04-09',
              date_to: '2016-04-11'
            },
            lat: null,
            lng: null,
            radius: null,
            location: '',
            start_time: '00:00',
            end_time: '00:00'
          }))
        })
      })
    })
  })

  describe('edit accreditation', () => {
    beforeEach(() => {
      props = {
        ...commonProps,
        award: {
          award_type: 'certificate',
          award_data: {
            date: '2017-11-28',
            name: 'Advanced Blockchain Developer',
            level: 'Advanced',
            description: 'Advanced blockchain developer training course'
          },
          date: null,
          delivery_type: 'In a classroom',
          enabled: 1,
          start_date: '2017-11-28T09:00:00.000Z',
          end_date: '2017-11-28T18:00:00.000Z',
          description: 'Advanced blockchain developer training course',
          level: 'Level 2',
          lat: '51.504',
          lng: '-0.0195',
          location_enable: 1,
          location: 'Canada Square, London',
          radius: '300',
          name: 'Advanced Blockchain Developer',
          type: 'Certification',
          created_at: '2017-11-08 06:29:14',
          updated_at: 'updated_at',
          pending: 'fetchSuccess',
          successMsg: null,
          errorMsg: null,
          qrCode: 'qrCode'
        },
        editMode: true
      }
      wrapper = shallow(
        <AccreditationsForm {...props} />
      )
      props.save.mockReset()
      props.cancel.mockReset()
    })

    describe('componentWillReceiveProps', () => {
      describe('when saveSuccess', () => {
        it('does not call props.cancel', () => {
          wrapper.setProps({
            orgAccreditations: {
              ...commonProps.orgAccreditations,
              pending: 'saveSuccess'
            }
          })
          expect(props.cancel).not.toHaveBeenCalled()
        })
      })
    })

    describe('cancel', () => {
      it('calls props.cancel', () => {
        wrapper.instance().cancel()
        expect(props.cancel).toHaveBeenCalled()
      })
    })

    describe('save', () => {
      it('calls props.save correctly', () => {
        wrapper.setState({ delivery_type: 'Online' })
        wrapper.instance().save()
        expect(props.save).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Advanced Blockchain Developer',
          description: 'Advanced blockchain developer training course',
          award_type: 'certificate',
          level: 'Level 2',
          delivery_type: 'Online',
          enabled: 1,
          type: 'Certification',
          award_data: {
            date: '2017-11-28',
            name: 'Advanced Blockchain Developer',
            level: 'Advanced'
          },
          end_date: '2017-11-28',
          end_time: '18:00',
          start_date: '2017-11-28',
          start_time: '09:00',
          lat: 51.504,
          lng: -0.0195,
          location_enable: 1,
          location: 'Canada Square, London',
          radius: 300
        }))
      })
    })
  })
})
