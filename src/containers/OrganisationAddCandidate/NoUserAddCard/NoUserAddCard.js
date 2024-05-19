import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'
import './style.css'

/**
 <NotAdded />
 */
class NotAdded extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.onAdd(this.input.value)
    this.input.value = ''
  }

  handleRef = (elem) => {
    this.input = elem
  }

  render() {
    const { className } = this.props

    return (
      <section className={`NoUserAddCard ${className}`}>
        <div className="NoUserAddCard__txt-area">
          <p className="NoUserAddCard__msg">No results</p>
          <p className="NoUserAddCard__txt">
            Add candidate&apos;s email to create a request
          </p>
        </div>

        <form className="NoUserAddCard__right" onSubmit={this.handleSubmit}>
          <input
            className="NoUserAddCard__input"
            type="email"
            placeholder="example@domain.com"
            ref={this.handleRef}
            required
          />
          <button className="NoUserAddCard__btn" type="submit">
            ADD
          </button>
        </form>
      </section>
    )
  }
}

NotAdded.propTypes = {
  onAdd: PropTypes.func.isRequired,
  className: PropTypes.string
}

NotAdded.defaultProps = {
  className: ''
}

/**
 <Added />
 */
const Added = ({ candidateEmail, newRequestLink, className }) => (
  <section className={`NoUserAddCard ${className}`}>
    <div className="NoUserAddCard__txt-area">
      <p className="NoUserAddCard__msg">
        {candidateEmail} was added to your candidate list.
      </p>
      <p className="NoUserAddCard__txt">
        They&apos;ll be sent an invite when you create a request.
      </p>
    </div>

    <div className="NoUserAddCard__right NoUserAddCard__right--Added">
      <Link
        className="NoUserAddCard__btn NoUserAddCard__btn--green"
        to={newRequestLink}
      >
        Create Request
      </Link>
    </div>
  </section>
)

Added.propTypes = {
  candidateEmail: PropTypes.string.isRequired,
  newRequestLink: PropTypes.string.isRequired,
  className: PropTypes.string
}

Added.defaultProps = {
  className: ''
}

/**
 <NoUserAddCard />
 */
const NoUserAddCard = ({
  loading,
  added,
  onAdd,
  candidateEmail,
  newRequestLink,
  className
}) => {
  if (loading) {
    return (
      <section className="NoUserAddCard is-loading">
        <Loader size={50} color="#72d371" />
      </section>
    )
  }

  return !added
    ? <NotAdded className={className} onAdd={onAdd} />
    : (
      <Added
        className={className}
        candidateEmail={candidateEmail}
        newRequestLink={newRequestLink}
      />
    )
}

NoUserAddCard.propTypes = {
  loading: PropTypes.bool.isRequired,
  added: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
  candidateEmail: PropTypes.string,
  newRequestLink: PropTypes.string,
  className: PropTypes.string
}

NoUserAddCard.defaultProps = {
  className: ''
}

export default NoUserAddCard
