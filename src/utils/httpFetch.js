import config from 'store'
import { isLoaded, resetToken } from 'store/auth'

const httpFetch = async (uri, opts) => {
  const { store } = config
  const clientOpts = opts || {}
  const token = store.getState().auth.token
  const options = {
    ...clientOpts,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...clientOpts.headers
    },
    mode: 'cors'
  }

  if (isLoaded(store.getState())) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(uri, options)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const logoutExceptions = [
        'InvalidLoginException',
        'InvalidJwtToken'
      ]
      if (logoutExceptions.indexOf(json.core_error) !== -1) {
        // session expired - reset token
        store.dispatch(resetToken())
      }
      return json
    })
}

export default httpFetch
