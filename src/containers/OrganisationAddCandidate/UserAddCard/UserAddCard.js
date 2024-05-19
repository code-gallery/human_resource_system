import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isString from 'lodash/isString'
import Avatar from 'components/$Avatar'
import './style.css'

const UserAddCard = ({
  top,
  profileImage,
  name,
  tagline,
  added,
  onAdd,
  className
}) => {
  const style = classNames(
    'UserAddCard',
    { 'is-top': top },
    className
  )

  return (
    <section className={style}>
      <div className="UserAddCard__avatar">
        <Avatar imgUrl={profileImage} alt={name} />
      </div>

      <div className="UserAddCard__text">
        <div className="UserAddCard__name">{name}</div>
        <div className="UserAddCard__location">
          {isString(tagline) ? tagline : ''}
        </div>
      </div>

      {
        added
          ? <button disabled className="UserAddCard__btn is-disabled">ADDED</button>
          : <button className="UserAddCard__btn" onClick={onAdd}>ADD</button>
      }
    </section>
  )
}

UserAddCard.propTypes = {
  profileImage: PropTypes.string,
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string,
  added: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  top: PropTypes.bool,
  className: PropTypes.string
}

UserAddCard.defaultProps = {
  top: false,
  className: ''
}

export default UserAddCard
