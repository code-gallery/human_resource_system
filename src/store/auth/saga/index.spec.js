import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { ACTIONS } from '..'
import rootSaga, {
  watchFetchUser,
  fetchUser,
  watchUpdateUser,
  updateUser,
  watchFetchOrganisation,
  fetchUserOrganisations,
  watchFetchActivity,
  fetchUserActivity,
  watchDeleteJob,
  deleteJob,
  watchDeleteEducation,
  deleteEducation,
  watchDeleteAward,
  deleteAward,
  watchSaveAward,
  saveAward,
  watchSaveEntity,
  saveEntity,
  watchEditEntity,
  editEntity,
  watchEditAward,
  editAward,
  watchVerifyAward,
  verifyAward,
  watchVerifyEntity,
  verifyEntity
} from '.'

/**
 Watcher Saga's
 */
describe('watchFetchUser saga', () => {
  const gen = watchFetchUser()

  it('takes every FETCH_USER action and runs the correct saga', () => {
    const expected = takeEvery(ACTIONS.FETCH_USER, fetchUser)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchUpdateUser saga', () => {
  const gen = watchUpdateUser()

  it('takes every UPDATE_USER action and runs the correct saga', () => {
    const expected = takeEvery(ACTIONS.UPDATE_USER, updateUser)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchFetchOrganisation saga', () => {
  const gen = watchFetchOrganisation()

  it('takes latest FETCH_ORGANISATIONS action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.FETCH_ORGANISATIONS, fetchUserOrganisations)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchFetchActivity saga', () => {
  const gen = watchFetchActivity()

  it('takes latest FETCH_ACTIVITIES action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.FETCH_ACTIVITIES, fetchUserActivity)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchDeleteJob saga', () => {
  const gen = watchDeleteJob()

  it('takes latest DELETE_JOB action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.DELETE_JOB, deleteJob)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchDeleteEducation saga', () => {
  const gen = watchDeleteEducation()

  it('takes latest DELETE_EDUCATION action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.DELETE_EDUCATION, deleteEducation)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchDeleteAward saga', () => {
  const gen = watchDeleteAward()

  it('takes latest DELETE_AWARD action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.DELETE_AWARD, deleteAward)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchSaveAward saga', () => {
  const gen = watchSaveAward()

  it('takes latest SAVE_AWARD action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.SAVE_AWARD, saveAward)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchSaveEntity saga', () => {
  const gen = watchSaveEntity()

  it('takes latest SAVE_ENITY action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.SAVE_ENTITY, saveEntity)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchEditEntity saga', () => {
  const gen = watchEditEntity()

  it('takes latest EDIT_ENTITY action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.EDIT_ENTITY, editEntity)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchEditAward saga', () => {
  const gen = watchEditAward()

  it('takes latest EDIT_AWARD action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.EDIT_AWARD, editAward)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchVerifyAward saga', () => {
  const gen = watchVerifyAward()

  it('takes latest VERIFY_AWARD action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.VERIFY_AWARD, verifyAward)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

describe('watchVerifyEntity saga', () => {
  const gen = watchVerifyEntity()

  it('takes latest VERIFY_ENTITY action and runs the correct saga', () => {
    const expected = takeLatest(ACTIONS.VERIFY_ENTITY, verifyEntity)
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})

/**
 Root Saga
 */
describe('Root Saga', () => {
  const gen = rootSaga()

  it('calls all the watchers', () => {
    const expected = all([
      watchFetchUser(),
      watchFetchOrganisation(),
      watchDeleteJob(),
      watchDeleteEducation(),
      watchDeleteAward(),
      watchSaveAward(),
      watchSaveEntity(),
      watchEditEntity(),
      watchEditAward(),
      watchVerifyAward(),
      watchVerifyEntity(),
      watchUpdateUser(),
      watchFetchActivity()
    ])
    const actual = gen.next().value

    expect(actual).toEqual(expected)
  })
})
