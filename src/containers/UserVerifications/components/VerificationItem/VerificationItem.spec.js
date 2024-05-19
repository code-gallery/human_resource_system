import { getDetails } from './VerificationItem'

describe('<VerificationItem />', () => {
  describe('getDetails', () => {
    it('returns array', () => {
      const details = getDetails({})
      expect(details).toEqual([])
    })

    it('skips nil values', () => {
      const details = getDetails({
        one: null,
        two: undefined
      })
      expect(details).toEqual([])
    })

    it('skips acheivements, visibility and results', () => {
      const details = getDetails({
        achievements: '1',
        visibility: '2',
        results: '3'
      })
      expect(details).toEqual([])
    })

    it('skips objects', () => {
      const details = getDetails({
        one: {},
        two: []
      })
      expect(details).toEqual([])
    })

    it('formats dates', () => {
      const details = getDetails({
        date: '2018-01-01'
      })
      expect(details).toEqual([ 'January 2018' ])
    })

    it('uses nice labels for award types', () => {
      const details = getDetails({
        one: 'cpd'
      }, 'award')
      expect(details).toEqual([ 'Professional Development (CPD)' ])
    })

    it('returns list of properties', () => {
      const details = getDetails({
        one: '1',
        two: '2'
      })
      expect(details).toEqual([ '1', '2' ])
    })
  })
})
