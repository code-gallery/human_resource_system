import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Icon from 'components/Icon'
import 'components/Button/style.css'

const LinkedButton = ({
  to,
  color,
  icon,
  className,
  children,
  disabled,
  ...rest
}) => {
  const style = classNames(
    'Button',
    `Button--${color}`,
    { 'is-disabled': disabled },
    className
  )

  let onClick

  if (disabled) {
    onClick = (event) => {
      event.preventDefault()
    }
  }

  return (
    <Link to={to} className={style} onClick={onClick} {...rest}>
      {
        icon && (
          <span className="Button__icon">
            <Icon type={icon} color="#fff" />
          </span>
        )
      }
      {children}
    </Link>
  )
}

LinkedButton.defaultProps = {
  color: 'green',
  icon: false,
  className: '',
  disabled: false
}

LinkedButton.propTypes = {
  to: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]).isRequired,
  color: PropTypes.oneOf([ 'green', 'blue', 'red','yellow' ]),
  icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
}

export default LinkedButton
