import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import config from 'store'
import { ROUTE_URL } from 'containers/constants'
import { isLoaded } from 'store/auth'

const AuthRoute = ({ component: Component, ...rest }) => {
  const { store } = config
  const isAuthenticated = isLoaded(store.getState())
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: ROUTE_URL.login }} />
      )}
    />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.any // eslint-disable-line
}

export default AuthRoute
