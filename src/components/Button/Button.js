import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'components/Icon'
import './style.css'

const Button = ({
  color,
  icon,
  className,
  children,
  onClick,
  disabled,
  type
}) => {
  const style = classNames(
    'Button',
    `Button--${color}`,
    { 'is-disabled': disabled },
    className
  )

  const handler = !disabled ? onClick : null

  return (
    <button className={style} onClick={handler} type={type} disabled={disabled}>
      {
        icon && (
          <span className="Button__icon">
            <Icon type={icon} color="#fff" />
          </span>
        )
      }
      {children}
    </button>
  )
}

Button.defaultProps = {
  color: 'green',
  icon: false,
  className: '',
  disabled: false,
  type: 'button'
}

Button.propTypes = {
  color: PropTypes.oneOf([ 'green', 'blue', 'red', 'amber', 'white' ]),
  icon: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string
}

export default Button
