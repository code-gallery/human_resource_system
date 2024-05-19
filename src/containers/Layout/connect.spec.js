import { ROUTE_URL } from 'containers/constants'
import { setMobileNavActive } from 'store/navigation'
import { setEditMode } from 'store/layout'
import { mapState, mapDispatch } from './connect'

describe('containers/Layout/connect', () => {
  describe('mapState', () => {
    const commonState = {
      auth: {
        token: 'token',
        user: {
          first_name: 'Jane'
        },
        organisations: [ { id: 12 } ]
      },
      navigation: {
        isMobileNavActive: false
      },
      layout: {
        editMode: false
      }
    }

    describe('when route is Profile page', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          router: {
            location: {
              pathname: ROUTE_URL.profile
            }
          }
        }
      })

      it('returns a correctly mapped state', () => {
        expect(mapState(state)).toEqual({
          token: 'token',
          user: commonState.auth.user,
          organisations: [ { id: 12 } ],
          isLoggedIn: true,
          canEdit: true,
          isMobileNavActive: false,
          editMode: false
        })
      })
    })

    describe('when route is People page', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          router: {
            location: {
              pathname: ROUTE_URL.people
            }
          }
        }
      })

      it('returns a correctly mapped state', () => {
        expect(mapState(state)).toEqual({
          token: 'token',
          user: commonState.auth.user,
          organisations: [ { id: 12 } ],
          isLoggedIn: true,
          canEdit: false,
          isMobileNavActive: false,
          editMode: false
        })
      })
    })

    describe('when route is Organisation page (user can edit)', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          router: {
            location: {
              pathname: '/organisations/12'
            }
          }
        }
      })

      it('returns a correctly mapped state', () => {
        expect(mapState(state)).toEqual({
          token: 'token',
          user: commonState.auth.user,
          organisations: [ { id: 12 } ],
          isLoggedIn: true,
          canEdit: true,
          isMobileNavActive: false,
          editMode: false
        })
      })
    })

    describe('when route is Organisation page (user cannot edit)', () => {
      let state
      beforeEach(() => {
        state = {
          ...commonState,
          router: {
            location: {
              pathname: '/organisations/42'
            }
          }
        }
      })

      it('returns a correctly mapped state', () => {
        expect(mapState(state)).toEqual({
          token: 'token',
          user: commonState.auth.user,
          organisations: [ { id: 12 } ],
          isLoggedIn: true,
          canEdit: false,
          isMobileNavActive: false,
          editMode: false
        })
      })
    })
  })

  describe('mapDispatch', () => {
    it('returns correct functions', () => {
      expect(mapDispatch(() => {})).toEqual(expect.objectContaining({
        setMobileNavActive: expect.any(Function),
        setEditMode: expect.any(Function)
      }))
    })

    it('calls "setMobileNavActive" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setMobileNavActive('hello', 'world')
      expect(spy).toHaveBeenCalledWith(setMobileNavActive('hello', 'world'))
    })

    it('calls "setEditMode" correctly', () => {
      const spy = jest.fn()
      const dispatcher = mapDispatch(spy)
      dispatcher.setEditMode(true)
      expect(spy).toHaveBeenCalledWith(setEditMode(true))
    })
  })
})
