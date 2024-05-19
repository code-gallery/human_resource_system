import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import config from 'store'
import LoadingIndicator from 'components/LoadingIndicator'
import { HeroBlock, ProfileInfo } from 'components/Profile'
import PageContent from './components/PageContent'
import Profile from './Profile'

describe('containers/Profile', () => {
  const commonProps = {
    fetchOtherUserProfile: jest.fn(),
    fetchActivities: jest.fn(),
    fetchUserProfile: jest.fn(),
    deleteAward: jest.fn(),
    deleteJob: jest.fn(),
    deleteEducation: jest.fn(),
    updateUserProfile: jest.fn(),
    saveAward: jest.fn(),
    saveEntity: jest.fn(),
    editEntity: jest.fn(),
    editAward: jest.fn(),
    verifyAward: jest.fn(),
    verifyEntity: jest.fn(),
    setEditMode: jest.fn(),
    saveErrorMsg: null,
    editMode: false,
    pending: true,
    isMobileNavActive: false,
    userProfileError: ''
  }

  describe('when it is the current user profile', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        match: {
          params: {}
        },
        user: {
          first_name: 'Jane',
          last_name: 'Doe'
        }
      }

      wrapper = shallow(
        <Profile {...props} />
      )
      jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
    })

    it('props.fetchUserProfile is called on "componentWillMount"', () => {
      expect(props.fetchUserProfile).toHaveBeenCalled()
    })

    describe('when data is loading', () => {
      it('renders <LoadingIndicator />', () => {
        expect(wrapper.find(LoadingIndicator).length).toEqual(1)
      })
    })

    describe('componentWillReceiveProps', () => {
      beforeEach(() => {
        props.setEditMode.mockReset()
      })

      describe('saving successfully', () => {
        it('setEditMode is called correctly', () => {
          expect(props.setEditMode).not.toHaveBeenCalled()
          wrapper.instance().saving = true
          wrapper.setProps({ pending: true })
          wrapper.setProps({ pending: false })
          expect(props.setEditMode).toHaveBeenCalledWith(false)
        })

        it('shows success notification', () => {
          wrapper.instance().saving = true
          wrapper.setProps({ pending: true })
          wrapper.setProps({ pending: false })
          expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'success')
        })
      })

      describe('server side error while saving', () => {
        beforeEach(() => {
          wrapper.instance().saving = true
          wrapper.setProps({ saveErrorMsg: 'error message' })
        })

        it('setEditMode is not called', () => {
          expect(props.setEditMode).not.toHaveBeenCalled()
        })

        it('shows error notification', () => {
          expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'error')
        })
      })

      describe('when user changes', () => {
        it('updates state correctly', () => {
          wrapper.setProps({
            user: {
              first_name: 'Jane Marguerite',
              last_name: 'Doe'
            }
          })
          expect(wrapper.state('user').first_name).toEqual('Jane Marguerite')
          expect(wrapper.instance().user.first_name).toEqual('Jane Marguerite')
        })
      })
    })

    describe('when data has loaded', () => {
      beforeEach(() => {
        wrapper.setProps({
          pending: false
        })
      })

      it('renders no <LoadingIndicator />', () => {
        expect(wrapper.find(LoadingIndicator).length).toEqual(0)
      })

      it('renders 1 <HeroBlock />', () => {
        expect(wrapper.find(HeroBlock).length).toEqual(1)
      })

      it('renders 1 <ProfileInfo />', () => {
        expect(wrapper.find(ProfileInfo).length).toEqual(1)
      })

      it('renders 1 <PageContent />', () => {
        expect(wrapper.find(PageContent).length).toEqual(1)
      })
    })

    describe('deleteAward', () => {
      it('calls props.deleteAward correctly', () => {
        wrapper.instance().deleteAward(126, 'language')
        expect(props.deleteAward).toHaveBeenCalledWith(
          { id: 126, type: 'language' },
          expect.any(Function),
          expect.any(Function)
        )
      })
    })

    describe('deleteWork', () => {
      it('calls props.deleteJob correctly', () => {
        wrapper.instance().deleteWork(126)
        expect(props.deleteJob).toHaveBeenCalledWith(
          { id: 126 },
          expect.any(Function),
          expect.any(Function)
        )
      })
    })

    describe('deleteEducation', () => {
      it('calls props.deleteEducation correctly', () => {
        wrapper.instance().deleteEducation(126)
        expect(props.deleteEducation).toHaveBeenCalledWith(
          { id: 126 },
          expect.any(Function),
          expect.any(Function)
        )
      })
    })

    describe('saveAward', () => {
      describe('when new (no id)', () => {
        it('calls props.saveAward correctly', () => {
          wrapper.instance().saveAward('data', false)
          expect(props.saveAward).toHaveBeenCalledWith(
            'data',
            expect.any(Function),
            expect.any(Function)
          )
        })
      })

      describe('when edit (id ok)', () => {
        it('calls props.editAward correctly', () => {
          const data = { id: 1, hello: 'world' }
          wrapper.instance().saveAward(data, false)
          expect(props.editAward).toHaveBeenCalledWith(
            data,
            expect.any(Function),
            expect.any(Function)
          )
        })
      })
    })

    describe('saveEntity', () => {
      describe('when new (no id)', () => {
        it('calls props.saveEntity correctly', () => {
          wrapper.instance().saveEntity('data', false)
          expect(props.saveEntity).toHaveBeenCalledWith(
            'data',
            expect.any(Function),
            expect.any(Function)
          )
        })
      })

      describe('when edit (id ok)', () => {
        it('calls props.editEntity correctly', () => {
          const data = { id: 1, hello: 'world' }
          wrapper.instance().saveEntity(data, false)
          expect(props.editEntity).toHaveBeenCalledWith(
            data,
            expect.any(Function),
            expect.any(Function)
          )
        })
      })
    })

    describe('updateProfileImage', () => {
      it('sets state correctly', () => {
        const expected = '/path/profile/image'
        wrapper.instance().updateProfileImage(expected)
        expect(wrapper.state().user).toEqual({
          ...props.user,
          profile_image: expected
        })
      })
    })

    describe('saveChanges', () => {
      describe('when first_name and last_name are valid', () => {
        it('calls props.updateUserProfile correctly', () => {
          wrapper.instance().saveChanges()
          expect(props.updateUserProfile).toHaveBeenCalledWith(props.user)
        })
      })

      describe('when first_name and last_name are not valid', () => {
        it('shows error notification', () => {
          wrapper.setState({
            user: {
              first_name: '',
              last_name: 'Doe'
            }
          })
          wrapper.instance().saveChanges()
          expect(wrapper.instance().notifyFn).toHaveBeenCalledWith(expect.any(String), 'error')
        })
      })
    })

    describe('undoChanges', () => {
      it('updates state correctly', () => {
        const user = {
          first_name: 'John',
          last_name: 'Smith',
          hello: 'world'
        }
        wrapper.instance().user = user
        wrapper.instance().undoChanges()
        expect(wrapper.state('user')).toEqual(user)
      })
    })

    describe('filterEntries', () => {
      describe('when uid is undefined', () => {
        it('returns correct value (1)', () => {
          const item = { id: 1, verified_status: 'declined' }
          wrapper.instance().filterEntries(item)
          expect(item.verified_status).toEqual('declined')
        })

        it('returns correct value (2)', () => {
          const item = { id: 1, verified_status: 'verified' }
          wrapper.instance().filterEntries(item)
          expect(item.verified_status).toEqual('verified')
        })
      })
    })
  })

  describe('when it is another user profile', () => {
    let wrapper
    let props
    beforeEach(() => {
      props = {
        ...commonProps,
        match: {
          params: {
            uid: 208
          }
        },
        user: {
          first_name: 'Jane',
          last_name: 'Doe'
        }
      }

      wrapper = shallow(
        <Profile {...props} />
      )
      jest.spyOn(wrapper.instance(), 'notifyFn').mockImplementation(function() {})
    })

    describe('componentWillMount', () => {
      it('calls props.fetchOtherUserProfile', () => {
        expect(props.fetchUserProfile).toHaveBeenCalled()
      })
    })

    describe('filterEntries', () => {
      describe('when uid exists', () => {
        it('returns correct value', () => {
          const item = { id: 1, verified_status: 'declined' }
          wrapper.instance().filterEntries(item)
          expect(item.verified_status).toEqual('not_verified')
        })
      })
    })

    describe('when user profile is not verified', () => {
      it('renders correctly', () => {
        const { store } = config
        const newProps = {
          ...props,
          user: {
            ...props.user,
            biometrics_status: ''
          },
          pending: false
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Profile {...newProps} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when props.userProfileError !== "" ', () => {
      it('renders correctly', () => {
        const { store } = config
        const newProps = {
          ...props,
          user: {
            ...props.user,
            biometrics_status: 'complete'
          },
          pending: false,
          userProfileError: 'profile not found or error'
        }
        const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <Profile {...newProps} />
            </Router>
          </Provider>
        ).toJSON()

        expect(tree).toMatchSnapshot()
      })
    })
  })
})
