import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ContentCard from 'components/ContentCard'

const AboutEdit = (props) => {
  const { about_us } = props.organisation
  const { onChangeInput, errors } = props
  const cssFormGroup = classNames('form-group', {
    'has-error': errors.indexOf('about_us') !== -1
  })

  return (
    <ContentCard title="About">
      <form>
        <div className={cssFormGroup}>
          <textarea
            name="about_us"
            className="edit-text-area"
            defaultValue={about_us}
            onChange={onChangeInput}
          />
        </div>
      </form>
    </ContentCard>
  )
}

AboutEdit.propTypes = {
  organisation: PropTypes.shape({
    about_us: PropTypes.string
  }),
  onChangeInput: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired
}

export default AboutEdit
