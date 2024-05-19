import reducer, {
  ACTIONS,
  isLoaded,
  isUserLoaded,
  belongsToOrg,
  loginFailed,
  loginSuccess,
  resetToken,
  setToken,
  updateUserProfile,
  fetchOrganisations,
  fetchUserProfile,
  fetchUser,
  setUser,
  addAward,
  deleteAward,
  deleteJob,
  deleteEducation
} from './index.js'

describe('reducer: store/auth', () => {
  describe('Action Creators', () => {
    describe('loginFailed', () => {
      it('returns the correct action', () => {
        const action = loginFailed()
        expect(action.type).toEqual(ACTIONS.LOGIN_FAILED)
        expect(action.error).toContain('try again')
      })
    })

    describe('loginSuccess', () => {
      it('returns the correct action', () => {
        const action = loginSuccess()
        expect(action).toEqual({
          type: ACTIONS.LOGIN_SUCCESS
        })
      })
    })

    describe('fetchUserProfile', () => {
      it('returns the correct action', () => {
        const action = fetchUserProfile()
        expect(action).toEqual({
          type: ACTIONS.FETCH_USER_PROFILE
        })
      })
    })

    describe('updateUserProfile', () => {
      it('returns the correct action', () => {
        const action = updateUserProfile()
        expect(action).toEqual({
          type: ACTIONS.UPDATE_USER
        })
      })
    })

    describe('addAward', () => {
      it('returns the correct action', () => {
        const action = addAward()
        expect(action).toEqual({
          type: ACTIONS.ADD_USER_AWARD
        })
      })
    })

    describe('deleteAward', () => {
      it('returns the correct action', () => {
        const payload = { id: 12 }
        const action = deleteAward(payload)
        expect(action).toEqual({
          type: ACTIONS.DELETE_AWARD,
          payload
        })
      })
    })

    describe('deleteJob', () => {
      it('returns the correct action', () => {
        const payload = { id: 12 }
        const action = deleteJob(payload)
        expect(action).toEqual({
          type: ACTIONS.DELETE_JOB,
          payload
        })
      })
    })

    describe('deleteEducation', () => {
      it('returns the correct action', () => {
        const payload = { id: 12 }
        const action = deleteEducation(payload)
        expect(action).toEqual({
          type: ACTIONS.DELETE_EDUCATION,
          payload
        })
      })
    })

    describe('setToken', () => {
      it('returns the correct action', () => {
        const payload = { token: 'tokenvalue' }
        const action = setToken(payload)
        expect(action.type).toEqual(ACTIONS.SET_TOKEN)
        expect(action.payload).toEqual(payload)
      })
    })

    describe('resetToken', () => {
      it('returns the correct action', () => {
        const action = resetToken()
        expect(action.type).toEqual(ACTIONS.RESET_TOKEN)
      })
    })

    describe('setUser', () => {
      it('returns the correct action', () => {
        const payload = { first_name: 'Jane' }
        const action = setUser(payload)
        expect(action.type).toEqual(ACTIONS.SET_USER)
        expect(action.payload).toEqual(payload)
      })
    })

    describe('fetchUser', () => {
      it('returns the correct action', () => {
        const action = fetchUser()
        expect(action.type).toEqual(ACTIONS.FETCH_USER)
        expect(action.payload).toEqual(void 0)
      })
    })

    describe('fetchOrganisations', () => {
      it('returns the correct action', () => {
        const action = fetchOrganisations()
        expect(action.type).toEqual(ACTIONS.FETCH_ORGANISATIONS)
        expect(action.payload).toEqual(void 0)
      })
    })
  })

  describe('isLoaded', () => {
    describe('returns false', () => {
      expect(isLoaded({})).toEqual(false)
      expect(isLoaded({
        auth: { token: null }
      })).toBe(false)
    })

    describe('returns true', () => {
      expect(isLoaded({
        auth: { token: 'superlongvalidtoken' }
      })).toEqual(true)
    })
  })

  describe('isUserLoaded', () => {
    describe('returns false', () => {
      expect(isUserLoaded({})).toEqual(false)
      expect(isUserLoaded({
        auth: { user: null }
      })).toBe(false)
    })

    describe('returns true', () => {
      expect(isLoaded({
        auth: { token: 'superlongvalidtoken' }
      })).toEqual(true)
    })
  })

  describe('belongsToOrg', () => {
    describe('returns false', () => {
      expect(belongsToOrg({}, 12)).toEqual(false)
      expect(belongsToOrg({
        auth: { organisations: [] }
      }, 12)).toBe(false)
      expect(belongsToOrg({
        auth: { organisations: [ { id: 14 } ] }
      }, 12)).toBe(false)
    })

    describe('returns true', () => {
      expect(belongsToOrg({
        auth: { organisations: [ { id: 12 }, { id: 13 } ] }
      }, 12)).toEqual(true)
    })
  })

  describe('Reducer', () => {
    it('returns the correct initialState', () => {
      const state = reducer(void 0)
      expect(state).toEqual({
        token: null,
        saveErrorMsg: null,
        pending: false,
        error: '',
        organisations: [],
        allAwards: {
          award: [],
          cpd: [],
          certificate: [],
          achievement: [],
          skill: [],
          language: [],
          project: []
        },
        jobs: [],
        educations: [],
        activities: []
      })
    })

    describe('LOGIN', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.LOGIN
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            pending: true,
            token: null
          })
        )
      })
    })

    describe('LOGIN_FAILED', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.LOGIN_FAILED,
          error: 'Hello world'
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: 'Hello world',
            pending: false,
            token: null,
            user: null
          })
        )
      })
    })

    describe('LOGIN_SUCCESS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.LOGIN_SUCCESS
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            pending: false
          })
        )
      })
    })

    describe('FETCH_USER_PROFILE', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_USER_PROFILE
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            pending: true
          })
        )
      })
    })

    describe('FETCH_ORGANISATIONS', () => {
      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.FETCH_ORGANISATIONS
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            pending: true
          })
        )
      })
    })

    describe('SET_USER', () => {
      const payload = {
        // these are not camelCase because B/E is not
        first_name: 'Jane',
        last_name: 'Doe'
      }
      it('when state exists', () => {
        const existingState = {
          error: '',
          token: 'token',
          user: null
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_USER,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            user: payload,
            token: 'token'
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_USER,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            user: payload,
            token: null
          })
        )
      })
    })

    describe('SET_TOKEN', () => {
      const payload = {
        token: 'newToken'
      }
      it('when state exists', () => {
        const existingState = {
          error: '',
          token: 'token',
          user: null
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_TOKEN,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            user: null,
            token: 'newToken'
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_TOKEN,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            error: '',
            token: 'newToken'
          })
        )
      })
    })

    describe('RESET_TOKEN', () => {
      it('when state exists', () => {
        const existingState = {
          error: '',
          token: 'token',
          user: {
            first_name: 'Jane',
            last_name: 'Doe'
          },
          organisations: [ 'organisations' ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.RESET_TOKEN
        })

        expect(newState).toEqual({
          error: '',
          pending: false,
          token: null,
          saveErrorMsg: null,
          organisations: [],
          allAwards: {
            award: [],
            cpd: [],
            certificate: [],
            achievement: [],
            skill: [],
            language: [],
            project: []
          },
          jobs: [],
          educations: [],
          activities: []
        })
      })
    })

    describe('SET_ORGANISATIONS', () => {
      const payload = {
        organisations: [ 'org1', 'org2' ]
      }
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          organisations: [ 'org4' ],
          pending: true
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_ORGANISATIONS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            pending: false,
            token: 'token',
            organisations: payload.organisations
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_ORGANISATIONS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            pending: false,
            organisations: payload.organisations
          })
        )
      })
    })

    describe('SET_ACTIVITIES', () => {
      const payload = [ { id: 1 }, { id: 2 } ]
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          activities: [],
          pending: true
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_ACTIVITIES,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            pending: false,
            token: 'token',
            activities: payload
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_ACTIVITIES,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            pending: false,
            activities: payload
          })
        )
      })
    })

    describe('SET_USER_PROFILE', () => {
      const payload = {
        user: {
          // these are not camelCase because B/E is not
          first_name: 'Jane',
          last_name: 'Doe'
        },
        jobs: [ '1', '2' ],
        educations: [ 'edu1', 'edu2' ],
        allAwards: {
          award: [ 'a1', 'a2' ],
          cpd: [],
          certificate: [],
          achievement: [],
          skill: [],
          language: [],
          project: []
        }
      }
      it('when state exists', () => {
        const existingState = {
          error: '',
          token: 'token',
          user: null
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SET_USER_PROFILE,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            ...payload,
            error: '',
            token: 'token',
            pending: false
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.SET_USER_PROFILE,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            ...payload,
            error: '',
            token: null,
            pending: false
          })
        )
      })
    })

    describe('DELETE_JOB_SUCCESS', () => {
      const payload = {
        id: 9
      }
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          jobs: [ { id: 12 }, { id: 5 }, { id: 9 } ],
          educations: [ 'edu1' ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.DELETE_JOB_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            jobs: [ { id: 12 }, { id: 5 } ],
            educations: existingState.educations,
            token: 'token'
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE_JOB_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            jobs: [],
            educations: []
          })
        )
      })
    })

    describe('DELETE_EDUCATION_SUCCESS', () => {
      const payload = {
        id: 9
      }
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          educations: [ { id: 12 }, { id: 5 }, { id: 9 } ],
          jobs: [ 'j1' ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.DELETE_EDUCATION_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            jobs: existingState.jobs,
            educations: [ { id: 12 }, { id: 5 } ],
            token: 'token'
          })
        )
      })

      it('when state is undefined', () => {
        const newState = reducer(void 0, {
          type: ACTIONS.DELETE_EDUCATION_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            jobs: [],
            educations: []
          })
        )
      })
    })

    describe('DELETE_AWARD_SUCCESS', () => {
      const payload = {
        id: 9,
        type: 'language'
      }
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [ { id: 12 } ],
            language: [ { id: 9 }, { id: 5 } ],
            project: []
          },
          educations: [ 'edu1' ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.DELETE_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual(
          expect.objectContaining({
            allAwards: {
              ...existingState.allAwards,
              language: [ { id: 5 } ]
            },
            educations: existingState.educations,
            token: 'token'
          })
        )
      })
    })

    describe('UPDATE_USER', () => {
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          user: {
            first_name: 'Jane',
            last_name: 'Doe'
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.UPDATE_USER
        })

        expect(newState).toEqual({
          ...existingState,
          saveErrorMsg: null,
          pending: true
        })
      })
    })

    describe('UPDATE_USER_SUCCESS', () => {
      const payload = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com'
      }
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          user: {
            first_name: 'Jane',
            last_name: 'Doe'
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.UPDATE_USER_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          user: { ...payload },
          pending: false
        })
      })
    })

    describe('UPDATE_USER_ERROR', () => {
      it('when state exists', () => {
        const existingState = {
          token: 'token',
          user: {
            first_name: 'Jane',
            last_name: 'Doe'
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.UPDATE_USER_ERROR,
          payload: 'error message'
        })

        expect(newState).toEqual({
          ...existingState,
          saveErrorMsg: 'error message',
          pending: false
        })
      })
    })

    describe('SAVE_AWARD_SUCCESS', () => {
      const payload = {
        id: 4,
        type: 'award',
        value: 'hello',
        value2: 'world'
      }

      it('when state exists (1)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [ { id: 4 }, { id: 6 }, { id: 8 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { ...payload }, { id: 6 }, { id: 8 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })

      it('when state exists (2)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { ...payload } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })

      it('when state exists (3)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [ { id: 5 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { id: 5 }, { ...payload } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })
    })

    describe('VERIFY_AWARD_SUCCESS', () => {
      const payload = {
        id: 4,
        type: 'award',
        verified: false,
        value: 'hello',
        value2: 'world'
      }

      it('when state exists (1)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [ { id: 4, verified_status: 'pending' }, { id: 6 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { ...payload, verified_status: 'pending' }, { id: 6 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })

      it('when state exists (2)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { ...payload } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })

      it('when state exists (3)', () => {
        const existingState = {
          token: 'token',
          allAwards: {
            award: [ { id: 5 } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_AWARD_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          allAwards: {
            award: [ { id: 5 }, { ...payload } ],
            cpd: [],
            certificate: [],
            language: [ { id: 2 } ]
          }
        })
      })
    })

    describe('SAVE_ENTITY_SUCCESS', () => {
      const payload = {
        id: 4,
        entity_type: 'educations',
        value: 'hello',
        value2: 'world'
      }

      it('when state exists (1)', () => {
        const existingState = {
          token: 'token',
          educations: [ { id: 4 }, { id: 5 }, { id: 6 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { ...payload }, { id: 5 }, { id: 6 } ]
        })
      })

      it('when state exists (2)', () => {
        const existingState = {
          token: 'token',
          educations: []
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { ...payload } ]
        })
      })

      it('when state exists (3)', () => {
        const existingState = {
          token: 'token',
          educations: [ { id: 5 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.SAVE_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { id: 5 }, { ...payload } ]
        })
      })
    })

    describe('VERIFY_ENTITY_SUCCESS', () => {
      const payload = {
        id: 4,
        entity_type: 'educations',
        verified: false,
        value: 'hello',
        value2: 'world'
      }

      it('when state exists (1)', () => {
        const existingState = {
          token: 'token',
          educations: [ { id: 4, verified: true, verified_status: 'pending' }, { id: 5 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { ...payload, verified_status: 'pending' }, { id: 5 } ]
        })
      })

      it('when state exists (2)', () => {
        const existingState = {
          token: 'token',
          educations: []
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { ...payload } ]
        })
      })

      it('when state exists (3)', () => {
        const existingState = {
          token: 'token',
          educations: [ { id: 5 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.VERIFY_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          educations: [ { id: 5 }, { ...payload } ]
        })
      })
    })

    describe('EDIT_ENTITY_SUCCESS', () => {
      const payload = {
        id: 4,
        entity_type: 'jobs',
        verified: false,
        value: 'hello',
        value2: 'world'
      }

      it('when state exists (1)', () => {
        const existingState = {
          token: 'token',
          jobs: [ { id: 4, verified: true, verified_status: 'pending' }, { id: 5 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.EDIT_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          jobs: [ { ...payload, verified_status: 'pending' }, { id: 5 } ]
        })
      })

      it('when state exists (2)', () => {
        const existingState = {
          token: 'token',
          jobs: []
        }
        const newState = reducer(existingState, {
          type: ACTIONS.EDIT_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          jobs: [ { ...payload } ]
        })
      })

      it('when state exists (3)', () => {
        const existingState = {
          token: 'token',
          jobs: [ { id: 5 } ]
        }
        const newState = reducer(existingState, {
          type: ACTIONS.EDIT_ENTITY_SUCCESS,
          payload
        })

        expect(newState).toEqual({
          token: 'token',
          jobs: [ { id: 5 }, { ...payload } ]
        })
      })
    })
  })
})
