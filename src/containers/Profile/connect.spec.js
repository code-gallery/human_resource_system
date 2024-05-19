import {
  fetchUserProfile,
  fetchActivities,
  deleteJob,
  deleteEducation,
  deleteAward,
  saveAward,
  saveEntity,
  editEntity,
  editAward,
  verifyAward,
  verifyEntity,
  updateUserProfile
} from 'store/auth'
import { fetchOtherUserProfile } from 'store/userProfile'
import { setEditMode } from 'store/layout'
import { mapState, mapDispatch } from './connect'

describe('containers/Profile/connect', () => {
  describe('mapState', () => {
    const commonState = {
      reference: 'reference',
      navigation: {
        isMobileNavActive: false
      },
      userProfile: {
        error: null
      }
    }

    describe('when profile is current user', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          auth: {
            user: {
              first_name: 'Jane'
            },
            allAwards: 'allAwards',
            jobs: 'jobs',
            educations: 'educations',
            activities: 'activities',
            pending: false,
            saveErrorMsg: null
          }
        }
      })

      it('returns a correctly mapped state', () => {
        const arg2 = {
          match: { params: {} }
        }

        expect(mapState(state, arg2)).toEqual({
          user: state.auth.user,
          userProfileError: null,
          pending: false,
          saveErrorMsg: null,
          allAwards: 'allAwards',
          jobs: 'jobs',
          educations: 'educations',
          isMobileNavActive: false,
          activities: 'activities',
          reference: 'reference'
        })
      })
    })

    describe('when profile is another user', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          userProfile: {
            user: {
              first_name: 'mike'
            },
            allAwards: 'allAwards',
            jobs: 'jobs',
            educations: 'educations',
            activities: 'activities',
            pending: false,
            error: null
          }
        }
      })

      it('returns a correctly mapped state', () => {
        const arg2 = {
          match: { params: { uid: 'mike' } }
        }

        expect(mapState(state, arg2)).toEqual({
          user: state.userProfile.user,
          userProfileError: null,
          pending: false,
          saveErrorMsg: null,
          allAwards: 'allAwards',
          jobs: 'jobs',
          educations: 'educations',
          isMobileNavActive: false,
          activities: 'activities',
          reference: 'reference'
        })
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        fetchUserProfile: expect.any(Function),
        fetchActivities: expect.any(Function),
        updateUserProfile: expect.any(Function),
        deleteJob: expect.any(Function),
        deleteEducation: expect.any(Function),
        deleteAward: expect.any(Function),
        saveAward: expect.any(Function),
        saveEntity: expect.any(Function),
        editEntity: expect.any(Function),
        editAward: expect.any(Function),
        verifyAward: expect.any(Function),
        verifyEntity: expect.any(Function),
        fetchOtherUserProfile: expect.any(Function),
        setEditMode: expect.any(Function)
      }))
    })

    it('calls "fetchUserProfile" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchUserProfile()
      expect(spy).toHaveBeenCalledWith(fetchUserProfile())
    })

    it('calls "fetchActivities" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchActivities()
      expect(spy).toHaveBeenCalledWith(fetchActivities())
    })

    it('calls "updateUserProfile" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.updateUserProfile('hello', 'world')
      expect(spy).toHaveBeenCalledWith(updateUserProfile('hello', 'world'))
    })

    it('calls "deleteJob" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.deleteJob('hello', 'world')
      expect(spy).toHaveBeenCalledWith(deleteJob('hello', 'world'))
    })

    it('calls "deleteEducation" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.deleteEducation('hello', 'world')
      expect(spy).toHaveBeenCalledWith(deleteEducation('hello', 'world'))
    })

    it('calls "deleteAward" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.deleteAward('hello', 'world')
      expect(spy).toHaveBeenCalledWith(deleteAward('hello', 'world'))
    })

    it('calls "saveAward" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveAward('hello', 'world')
      expect(spy).toHaveBeenCalledWith(saveAward('hello', 'world'))
    })

    it('calls "saveEntity" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.saveEntity('hello', 'world')
      expect(spy).toHaveBeenCalledWith(saveEntity('hello', 'world'))
    })

    it('calls "editEntity" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.editEntity('hello', 'world')
      expect(spy).toHaveBeenCalledWith(editEntity('hello', 'world'))
    })

    it('calls "editAward" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.editAward('hello', 'world')
      expect(spy).toHaveBeenCalledWith(editAward('hello', 'world'))
    })

    it('calls "verifyAward" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.verifyAward('hello', 'world')
      expect(spy).toHaveBeenCalledWith(verifyAward('hello', 'world'))
    })

    it('calls "verifyEntity" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.verifyEntity('hello', 'world')
      expect(spy).toHaveBeenCalledWith(verifyEntity('hello', 'world'))
    })

    it('calls "fetchOtherUserProfile" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.fetchOtherUserProfile('hello', 'world')
      expect(spy).toHaveBeenCalledWith(fetchOtherUserProfile('hello', 'world'))
    })

    it('calls "setEditMode" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setEditMode(true)
      expect(spy).toHaveBeenCalledWith(setEditMode(true))
    })
  })
})
