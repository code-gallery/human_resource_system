import {
  getApiUrl,
  getApiErrorMessage,
  getIntelligentProfileUrl
} from './constants'

describe('containers/constants', () => {
  describe('getApiUrl', () => {
    describe('when REACT_APP_API_ENV = local', () => {
      it('returns correct base url', () => {
        process.env.REACT_APP_API_ENV = 'local'
        expect(getApiUrl('login')).toContain('localhost:3333')
      })
    })

    describe('when REACT_APP_API_ENV = staging', () => {
      it('returns correct base url', () => {
        process.env.REACT_APP_API_ENV = 'staging'
        expect(getApiUrl('login')).toContain('//api-staging-51le5z.appii.io')
      })
    })

    describe('when REACT_APP_API_ENV = test', () => {
      it('returns correct base url', () => {
        process.env.REACT_APP_API_ENV = 'test'
        expect(getApiUrl('login')).toContain('//api-test-jdc9nn.appii.io')
      })
    })

    describe('when REACT_APP_API_ENV = production', () => {
      it('returns correct base url', () => {
        process.env.REACT_APP_API_ENV = 'production'
        expect(getApiUrl('login')).toContain('https://api.appii.io')
      })
    })

    describe('when REACT_APP_API_ENV none of the above', () => {
      it('returns correct default base url', () => {
        process.env.REACT_APP_API_ENV = 'none'
        expect(getApiUrl('login')).toContain('//api-test-jdc9nn.appii.io')
      })
    })
  })

  describe('getApiErrorMessage', () => {
    it('returns default message', () => {
      expect(getApiErrorMessage()).toContain('error has occured')
    })

    it('returns correct message (1)', () => {
      const json = {
        errors: [ { error: 'error message' }, { error: 'hello' } ]
      }
      expect(getApiErrorMessage(json)).toEqual('error message')
    })

    it('returns correct message (2)', () => {
      const json = {
        errors: [ { validation: true, message: 'error message' } ]
      }
      expect(getApiErrorMessage(json)).toEqual('error message')
    })
  })

  describe('getIntelligentProfileUrl', () => {
    describe('when location href is test', () => {
      it('returns the correct url', () => {
        expect(getIntelligentProfileUrl('token', 'https://test-jdc9nn.appii.io'))
          .toEqual('https://intelligentprofile-test-jdc9nn.appii.io/setting_up?jwt=token')
      })
    })

    describe('when location href is staging', () => {
      it('returns the correct url', () => {
        expect(getIntelligentProfileUrl('token', 'https://staging.appii.io'))
          .toEqual(false)
      })
    })

    describe('when location href is production', () => {
      it('returns the correct url', () => {
        expect(getIntelligentProfileUrl('token', 'https://appii.io'))
          .toEqual('https://intelligent-profile.appii.io/setting_up?jwt=token')
      })
    })

    describe('when location href is none of the above', () => {
      it('returns false', () => {
        expect(getIntelligentProfileUrl('token', 'localhost'))
          .toEqual(false)
      })
    })
  })
})
