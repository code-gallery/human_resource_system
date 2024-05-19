import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.css'

const PageTitle = (props) => {
  const { title, type, children } = props
  const cssContainer = (type === 'background') ? 'PageTitle container-fluid' : 'PageTitle container'
  const cssCol = classNames('col-xs-12', {
    'PageTitle-background': (type === 'background')
  })

  return (
    <div className={cssContainer}>
      <div className="row">
        <div className={cssCol}>
          {children && !title &&
            <p className={`PageTitle-${type}`}>
              {children}
            </p>
          }
          {title && !children &&
            <p className={`PageTitle-${type}`}>{title}</p>
          }
        </div>
      </div>
    </div>
  )
}

PageTitle.defaultProps = {
  type: 'type1'
}

PageTitle.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.element
}

export default PageTitle
