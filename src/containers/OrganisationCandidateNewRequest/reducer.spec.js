import freeze from 'deep-freeze'
import isObject from 'lodash/isObject'
import reducer, {
  ACTIONS,
  requestOrganisationConfig,
  saveOrganisationConfig,
  postNewRequest,
  requestPosted,
  requestErrored,
  resetNewRequest,
  initialState
} from './reducer'

describe('Action Creators', () => {
  describe('requestOrganisationConfig', () => {
    const orgId = 10
    const action = requestOrganisationConfig(orgId)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_ORGANISATION_CONFIG
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      it('has organisation ID', () => {
        const expected = orgId
        const actual = action.payload.orgId

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('saveOrganisationConfig', () => {
    const orgConfigMock = {}
    const action = saveOrganisationConfig(orgConfigMock)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.SAVE_ORGANISATION_CONFIG
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    describe('Payload', () => {
      it('has the organisation configuration', () => {
        const expected = orgConfigMock
        const actual = action.payload.checkConfig

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('postNewRequest', () => {
    const orgId = 5
    const candidateId = 10
    const requestInfo = {}
    const action = postNewRequest(orgId, candidateId, requestInfo)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.POST_NEW_REQUEST
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = {
        orgId,
        candidateId,
        requestInfo
      }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('requestPosted', () => {
    const requestInfo = {}
    const action = requestPosted(requestInfo)

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.POST_NEW_REQUEST_SUCCESS
      const actual = action.type

      expect(actual).toEqual(expected)
    })

    it('has the correct payload', () => {
      const expected = { requestInfo }
      const actual = action.payload

      expect(actual).toEqual(expected)
    })
  })

  describe('requestErrored', () => {
    const action = requestErrored()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.REQUEST_ERROR
      const actual = action.type

      expect(actual).toEqual(expected)
    })
  })

  describe('resetNewRequest', () => {
    const action = resetNewRequest()

    it('returns a object', () => {
      const expected = true
      const actual = isObject(action)

      expect(actual).toEqual(expected)
    })

    it('has the correct action type', () => {
      const expected = ACTIONS.RESET_NEW_REQUEST
      const actual = action.type

      expect(actual).toEqual(expected)
    })
  })
})

describe('Reducer', () => {
  describe('Action: Unkown', () => {
    const state = freeze({})
    const action = { type: 'FOO' }

    it('returns given state', () => {
      const expected = state
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('when state = undefined', () => {
    const state = void 0
    const action = { type: 'ANY' }

    it('sets & returns initial state', () => {
      const expected = initialState
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_ORGANISATION_CONFIG', () => {
    const state = freeze(initialState)
    const orgConfig = {}
    const action = requestOrganisationConfig(orgConfig)

    it('returns the correct new state', () => {
      const expected = {
        loading: true,
        error: null,
        organisationChecks: {
          rightToWork: {
            price: null,
            enabled: null
          },
          dbs: {
            price: null,
            enabled: null
          },
          dbsEnhanced: {
            price: null,
            enabled: null
          },
          dbsBasic: {
            price: null,
            enabled: null
          },
          company: {
            price: null,
            enabled: null
          }
        },

        posted: false,
        postedInfo: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: SAVE_ORGANISATION_CONFIG', () => {
    const state = freeze({
      loading: true,
      error: null,
      organisationChecks: {
        rightToWork: {
          price: null,
          enabled: null
        },
        dbs: {
          price: null,
          enabled: null
        },
        dbsEnhanced: {
          price: null,
          enabled: null
        },
        dbsBasic: {
          price: null,
          enabled: null
        }
      },

      posted: false,
      postedInfo: null
    })

    const checkConfig = {
      rightToWork: {
        price: 1000,
        enabled: true
      },
      dbs: {
        price: 2000,
        enabled: true
      },
      dbsEnhanced: {
        price: 3000,
        enabled: true
      },
      dbsBasic: {
        price: 1000,
        enabled: true
      }
    }

    const action = saveOrganisationConfig(checkConfig)

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: null,
        organisationChecks: {
          rightToWork: {
            price: checkConfig.rightToWork.price,
            enabled: checkConfig.rightToWork.enabled
          },
          dbs: {
            price: checkConfig.dbs.price,
            enabled: checkConfig.dbs.enabled
          },
          dbsEnhanced: {
            price: checkConfig.dbsEnhanced.price,
            enabled: checkConfig.dbsEnhanced.enabled
          },
          dbsBasic: {
            price: checkConfig.dbsBasic.price,
            enabled: checkConfig.dbsBasic.enabled
          }
        },

        posted: false,
        postedInfo: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: POST_NEW_REQUEST', () => {
    const state = freeze({
      loading: false,
      error: null,
      organisationChecks: {
        rightToWork: {
          price: 1000,
          enabled: true
        },
        dbs: {
          price: 2000,
          enabled: true
        },
        dbsEnhanced: {
          price: 3000,
          enabled: true
        },
        dbsBasic: {
          price: 1000,
          enabled: true
        }
      },

      posted: false,
      postedInfo: null
    })
    const requestInfo = {}
    const action = postNewRequest(requestInfo)

    it('returns the correct new state', () => {
      const expected = {
        loading: true,
        error: null,
        organisationChecks: {
          rightToWork: {
            price: 1000,
            enabled: true
          },
          dbs: {
            price: 2000,
            enabled: true
          },
          dbsEnhanced: {
            price: 3000,
            enabled: true
          },
          dbsBasic: {
            price: 1000,
            enabled: true
          }
        },

        posted: false,
        postedInfo: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: POST_NEW_REQUEST_SUCCESS', () => {
    const state = freeze({
      loading: true,
      error: null,
      organisationChecks: {
        rightToWork: {
          price: 1000,
          enabled: true
        },
        dbs: {
          price: 2000,
          enabled: true
        },
        dbsEnhanced: {
          price: 3000,
          enabled: true
        },
        dbsBasic: {
          price: 1000,
          enabled: true
        }
      },

      posted: false,
      postedInfo: null
    })
    const requestInfo = {}
    const action = requestPosted(requestInfo)

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: null,
        organisationChecks: {
          rightToWork: {
            price: 1000,
            enabled: true
          },
          dbs: {
            price: 2000,
            enabled: true
          },
          dbsEnhanced: {
            price: 3000,
            enabled: true
          },
          dbsBasic: {
            price: 1000,
            enabled: true
          }
        },

        posted: true,
        postedInfo: requestInfo
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: REQUEST_ERROR', () => {
    const state = freeze({
      loading: true,
      error: null,
      organisationChecks: {
        rightToWork: {
          price: 1000,
          enabled: true
        },
        dbs: {
          price: 2000,
          enabled: true
        },
        dbsEnhanced: {
          price: 3000,
          enabled: true
        },
        dbsBasic: {
          price: 1000,
          enabled: true
        }
      },

      posted: false,
      postedInfo: null
    })
    const action = requestErrored()

    it('returns the correct new state', () => {
      const expected = {
        loading: false,
        error: true,
        organisationChecks: {
          rightToWork: {
            price: 1000,
            enabled: true
          },
          dbs: {
            price: 2000,
            enabled: true
          },
          dbsEnhanced: {
            price: 3000,
            enabled: true
          },
          dbsBasic: {
            price: 1000,
            enabled: true
          }
        },

        posted: false,
        postedInfo: null
      }

      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe('Action: RESET_NEW_REQUEST', () => {
    const state = freeze({
      loading: false,
      error: null,
      organisationChecks: {
        rightToWork: {
          price: 1000,
          enabled: true
        },
        dbs: {
          price: 2000,
          enabled: true
        },
        dbsEnhanced: {
          price: 3000,
          enabled: true
        },
        dbsBasic: {
          price: 1000,
          enabled: true
        }
      },

      posted: true,
      postedInfo: {}
    })
    const action = resetNewRequest()

    it('returns the correct new state', () => {
      const expected = initialState
      const actual = reducer(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
