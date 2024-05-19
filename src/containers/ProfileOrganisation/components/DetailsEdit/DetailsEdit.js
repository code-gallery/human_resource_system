import React from 'react'
import PropTypes from 'prop-types'
import _isNil from 'lodash/isNil'
import Autocomplete from 'react-google-autocomplete'
import classNames from 'classnames'
import Form from 'components/Abstract/Form'
import ContentCard from 'components/ContentCard'
import Input from 'components/FormElements/Input'
import Select from 'react-select'
import './style.css'

class DetailsEdit extends Form {
  constructor(props) {
    super(props)
    const { organisation } = props
    this.state = {
      name: organisation.name,
      industries: organisation.industries,
      year_founded: organisation.year_founded,
      company_size: organisation.company_size
    }
  }

  onChangeInput(event) {
    super.onChangeInput(event)
    this.props.onChangeInput(event)
  }

  render() {
    const { reference, organisation, errors } = this.props
    const { town, country } = organisation
    const { name, industries, year_founded, company_size } = this.state
    const industriesRef = (reference) ? reference.industries : []
    const { organisationSize } = reference
    const locationPlaceholder =
      (_isNil(town) || town === '') &&
      (_isNil(country) || country === '') ?
        'Enter your address' : `${town}, ${country}`

    return (
      <ContentCard title="Details" className="DetailsEdit">
        <form>
          <Input
            className={classNames({
              'has-error': errors.indexOf('name') !== -1
            })}
            label="Name"
            name="name"
            value={name}
            placeholder="Company name"
            onChange={this.onChangeInput}
          />
          <div
            className={classNames('form-group', {
              'has-error': errors.indexOf('company_size') !== -1
            })}
          >
            <label>Size</label>
            <Select
              name="select-content"
              options={organisationSize}
              labelKey="text"
              valueKey="text"
              value={company_size}
              onChange={(value) => {
                this.onChangeInput({
                  target: {
                    name: 'company_size',
                    value
                  }
                })
              }}
            />
          </div>
          <div
            className={classNames('form-group', {
              'has-error': errors.indexOf('town') !== -1 || errors.indexOf('country') !== -1
            })}
          >
            <label>Location</label>
            <Autocomplete
              onPlaceSelected={(value) => {
                this.onChangeInput({
                  target: {
                    name: 'location',
                    value
                  }
                })
              }}
              placeholder={locationPlaceholder}
              types={[ '(cities)' ]}
            />
          </div>
          <div
            className={classNames('form-group', {
              'has-error': errors.indexOf('industries') !== -1
            })}
          >
            <label>Industry</label>
            <Select
              name="select-content"
              options={industriesRef}
              labelKey="text"
              valueKey="text"
              value={industries}
              onChange={(value) => {
                this.onChangeInput({
                  target: {
                    name: 'industries',
                    value
                  }
                })
              }}
            />
          </div>
          <Input
            className={classNames({
              'has-error': errors.indexOf('year_founded') !== -1
            })}
            label="Year Founded"
            name="year_founded"
            value={year_founded}
            placeholder="YYYY"
            onChange={this.onChangeInput}
          />
        </form>
      </ContentCard>
    )
  }
}

DetailsEdit.propTypes = {
  organisation: PropTypes.shape({
    name: PropTypes.string,
    town: PropTypes.string,
    industries: PropTypes.string,
    company_size: PropTypes.string,
    year_founded: PropTypes.string
  }),
  onChangeInput: PropTypes.func.isRequired,
  reference: PropTypes.shape({
    awards: PropTypes.array,
    degrees: PropTypes.array,
    industries: PropTypes.array
  }),
  errors: PropTypes.array.isRequired
}

export default DetailsEdit
