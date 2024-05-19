import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/FormElements/Input'
import AccreditationsForm from './Form'

const Certificates = (props) => {
  const { onChangeInput, data } = props

  return (
    <AccreditationsForm {...props} title="Certificate Details">
      <div className="row">
        <div className="col-md-6">
          <Input name="award_level" value={data.award_level} label="Level" onChange={onChangeInput} />
        </div>
      </div>
    </AccreditationsForm>
  )
}

Certificates.propTypes = {
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired
  // onChangeFile: PropTypes.func.isRequired
}

export default Certificates
