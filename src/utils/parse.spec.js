import {
  parseAwards, parseResponse,
  parseArrayToOptions
} from './parse'

describe('utils/parse', () => {
  describe('parseAwards', () => {
    it('parse server data correctly', () => {
      const response = {
        data: [
          { id: 1, name: 'Award 1', type: 'award' },
          { id: 2, name: 'Project 1', type: 'project' },
          { id: 3, name: 'Project 2', type: 'project' },
          { id: 4, name: 'Chinese', type: 'language' }
        ]
      }

      const expected = {
        award: [
          { id: 1, name: 'Award 1', type: 'award' }
        ],
        project: [
          { id: 2, name: 'Project 1', type: 'project' },
          { id: 3, name: 'Project 2', type: 'project' }
        ],
        language: [
          { id: 4, name: 'Chinese', type: 'language' }
        ]
      }

      expect(parseAwards(response.data)).toEqual(expected)
    })
  })

  describe('parseResponse', () => {
    it('parse server data correctly', () => {
      const response = {
        data: [
          { id: 1, name: 'Organisation Size', value1: '1-10 employees' },
          { id: 2, name: 'Organisation Size', value1: '11-50 employees' },
          { id: 3, name: 'Organisation Size', value1: '51-200 employees' }
        ]
      }

      const expected = [
        { text: '1-10 employees' },
        { text: '11-50 employees' },
        { text: '51-200 employees' }
      ]

      expect(parseResponse(response.data, 'value1')).toEqual(expected)
    })

    describe('when data is not an array', () => {
      it('returns default empty array', () => {
        expect(parseResponse({ hello: 'world' })).toEqual([])
      })
    })
  })

  describe('parseArrayToOptions', () => {
    describe('when hasValue is true', () => {
      it('parse server data correctly', () => {
        const response = {
          data: [
            { id: 1, name: 'Industries', value1: 'Accounting' },
            { id: 2, name: 'Industries', value1: 'Aviation' },
            { id: 3, name: 'Industries', value1: 'IT' }
          ]
        }

        const expected = [
          { text: 'Accounting' },
          { text: 'Aviation' },
          { text: 'IT' }
        ]

        expect(parseArrayToOptions(response.data, true)).toEqual(expected)
      })
    })

    describe('when hasValue is false', () => {
      it('parse server data correctly', () => {
        const response = {
          data: [
            'hello',
            'world'
          ]
        }

        const expected = [
          { text: 'hello' },
          { text: 'world' }
        ]

        expect(parseArrayToOptions(response.data, false)).toEqual(expected)
      })
    })

    describe('when data is empty', () => {
      it('parse server data correctly', () => {
        expect(parseArrayToOptions([])).toEqual([])
      })
    })
  })
})
