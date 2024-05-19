import { put } from 'redux-saga/effects'
import httpFetch from 'utils/httpFetch'
import { fetchOrgAdmins, fetchOrgEmployees, addAdmin, deleteAdmin } from './index'
import { ACTIONS } from '../reducer'

describe('containers/OrgAdmins/saga', () => {
  describe('fetchOrgAdmins', () => {
    const payload = {
      orgId: 130
    }
    const gen = fetchOrgAdmins({ payload })

    it('calls correct API', () => {
      const url = '/apis/userapi/v0.1/organisations/130/admins'
      expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
    })

    it('triggers the correct action', () => {
      expect(gen.next({ data: 'adminData' }).value).toEqual(put({
        type: ACTIONS.FETCH_SUCCESS,
        payload: 'adminData'
      }))
    })
  })

  describe('fetchOrgEmployees', () => {
    const payload = {
      orgId: 130
    }
    const gen = fetchOrgEmployees({ payload })

    it('calls correct API', () => {
      const url = '/apis/userapi/v0.1/organisations/130/employees'
      expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'GET' }))
    })

    it('triggers the correct action', () => {
      expect(gen.next({ data: 'employeesData' }).value).toEqual(put({
        type: ACTIONS.FETCH_EMPLOYEES_SUCCESS,
        payload: 'employeesData'
      }))
    })
  })

  describe('addAdmin', () => {
    const payload = {
      orgId: 130,
      name: 'test',
      hello: 'world'
    }
    const gen = addAdmin({ payload })

    it('calls correct API', () => {
      const url = '/apis/userapi/v0.1/organisations/130/admins'
      expect(gen.next(payload).value).toEqual(
        httpFetch(url, {
          method: 'POST',
          body: JSON.stringify({ name: 'test', hello: 'world' })
        })
      )
    })

    it('triggers the correct action', () => {
      expect(gen.next({ data: 'data' }).value).toEqual(put({
        type: ACTIONS.ADD_ADMIN_SUCCESS,
        payload: 'data'
      }))
    })
  })

  describe('deleteAdmin', () => {
    const payload = {
      orgId: 130,
      adminId: 12,
      userId: 30
    }
    const gen = deleteAdmin({ payload })

    it('calls correct API', () => {
      const url = '/apis/userapi/v0.1/organisations/130/admins/12'
      expect(gen.next(payload).value).toEqual(httpFetch(url, { method: 'DELETE' }))
    })

    it('triggers the correct action', () => {
      expect(gen.next().value).toEqual(put({
        type: ACTIONS.DELETE_ADMIN_SUCCESS,
        payload: { adminId: 12, userId: 30 }
      }))
    })
  })
})
