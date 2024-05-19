import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.css'

const WorkPassMain = ({ hasNotification, children, className }) => {
  const style = classNames('WorkPassMain', { hasNotification }, className)

  return (
    <main className={style}>
      {children}
    </main>
  )
}

WorkPassMain.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hasNotification: PropTypes.bool.isRequired
}

WorkPassMain.defaultProps = {
  className: ''
}

export default WorkPassMain
