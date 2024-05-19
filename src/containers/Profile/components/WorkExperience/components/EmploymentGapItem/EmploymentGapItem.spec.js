import React from 'react'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'
import EmploymentGapItem from './index'


configure({adapter: new Adapter()});
describe('containers/Profile/components/.../EmploymentGapItem', () => {
  const commonProps = {
    start_date: '2017-08-01T00:00:00.000Z',
    end_date: '0000-00-00',
    company: 'Employment Gap',
    employment_type:'employment_gap',
    verified_status: 'pending_verification',
    org: {
      id: 25814,
      name: 'Employment Gap',
      about_us: null,
      activated:1,
      banner_image:null,
      company_size:null,
      logo_image: '//logo_image'
    },
    verification:null,
    verified:false,
    user_id:1023,
    visibility:'private',
    organisation_id:25814,
    description:'Education Gap for an year',
    industry:'Education / Training',
    position:'',
    gapsReasons:[
     {text:'Compassionate Leave'},
     {text:'Education / Training'},
     {text:'Gap Year'},
     {text:'Leave of Absence'},
     {text:'Redundancy'},
     {text:'Travel / Holiday'},
     {text:'Sabbatical'},
     {text:'Sick Leave'},
    ],
    location:null,
    toggleBlockEditing: jest.fn(),
    deleteWork: jest.fn(),
    toggleEdit: jest.fn(),
    saveEntity: jest.fn()
  }

  // const commonProps = {
  //   start_date: '2017-08-01T00:00:00.000Z',
  //   end_date: '0000-00-00',
  //   name: 'Dev 2',
  //   verified_status: 'verified',
  //   org: {
  //     id: 55,
  //     name: 'Applied Blockchain',
  //     logo_image: '//logo_image'
  //   },
  //   industries: [
  //     { text: 'Accounting' },
  //     { text: 'Animation' },
  //     { text: 'IT' }
  //   ],
  //   toggleBlockEditing: jest.fn(),
  //   deleteWork: jest.fn(),
  //   saveEntity: jest.fn()
  // }


  

  describe('when editMode is false', () => {
    it('renders correctly', () => {
      const props = {
        ...commonProps,
        editMode: false
      }
      const tree = renderer.create(
        <EmploymentGapItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when editMode is true', () => {
    const props = {
      ...commonProps,
      editMode: true
    }

    it('renders correctly', () => {
      const tree = renderer.create(
        <EmploymentGapItem {...props} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
 
    describe('UNSAFE_componentWillReceiveProps', () => {
      it('calls props.toggleBlockEditing correctly', () => {
        const wrapper = shallow(
          <EmploymentGapItem {...props} />
        )
        expect(props.toggleBlockEditing).not.toHaveBeenCalled()
        wrapper.setState({ edit: true }, function() {
          wrapper.setProps({
            editMode: false
          })
        })
        expect(props.toggleBlockEditing).toHaveBeenCalled()
        expect(wrapper.state('edit')).toEqual(false)
      })
    })
  })
})
