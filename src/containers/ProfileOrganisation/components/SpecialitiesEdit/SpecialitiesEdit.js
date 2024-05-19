import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _without from 'lodash/without'
import Form from 'components/Abstract/Form'
import ContentCard from 'components/ContentCard'
import './style.css'

class SpecialitiesEdit extends Form {
  constructor(props) {
    super(props)
    const { organisation } = props
    const { specialities } = organisation
    this.state = {
      specialities: (specialities) ? specialities.toLowerCase().split(',') : [],
      speciality: '',
      error: false
    }
  }

  onChange = (event) => {
    this.setState({
      speciality: event.target.value
    })
  }

  onClickAdd = (event) => {
    event.preventDefault()

    this.setState({
      error: false
    })

    const { specialities } = this.state
    const speciality = this.state.speciality.toLowerCase()
    if (speciality !== '' && specialities.indexOf(speciality) === -1) {
      // not empty and not duplicated
      specialities.push(speciality)
      this.setState({ specialities, speciality: '' })

      // notify parent component
      this.props.onChangeInput({
        target: {
          name: 'specialities',
          value: specialities.join(',')
        }
      })

    } else {
      this.setState({ error: true })
    }
  }

  onClickRemove = (value) => {
    const { specialities } = this.state
    const newArr = _without(specialities, value)

    this.setState({ specialities: newArr })

    // notify parent component
    this.props.onChangeInput({
      target: {
        name: 'specialities',
        value: newArr.join(',')
      }
    })
  }

  renderTagList() {
    const { specialities } = this.state
    if (specialities.length === 0) {
      return null
    }

    return (
      <ul className="TagList">
        {
          specialities.map((item, key) => {
            return (
              <li
                key={key}
                onClick={() => {
                  this.onClickRemove(item)
                }}
              >
                {item}
                <span className="TagList-remove">x</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    const { errors } = this.props
    const { speciality, error } = this.state

    return (
      <ContentCard title="Specialities" className="SpecialitiesEdit">
        {this.renderTagList()}
        <form>
          <div
            className={classNames('form-group', {
              'has-error': errors.indexOf('specialities') !== -1 || error
            })}
          >
            <input
              type="text"
              value={speciality}
              placeholder="Type to add specialities"
              onChange={this.onChange}
            />
            <button
              onClick={this.onClickAdd}
              className="btn blue-btn action-btn"
            >
              Add
            </button>
          </div>
        </form>
      </ContentCard>
    )
  }
}

SpecialitiesEdit.propTypes = {
  organisation: PropTypes.shape({
    specialities: PropTypes.string
  }),
  onChangeInput: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
}

export default SpecialitiesEdit
