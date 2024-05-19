import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/FormElements/Input'
import TextArea from 'components/FormElements/TextArea'
import SharedInputs from '../SharedInputs'

const AccreditationsDetailsForm = (props) => {
  const { title, onChangeInput, data, children } = props

  return (
    <form className="separator">
      <h4>{title}</h4>
      <Input name="name" value={data.name} label="Name" onChange={onChangeInput} />
      <TextArea name="description" defaultValue={data.description} label="Details" onChange={onChangeInput} />
      { children }
      <SharedInputs onChangeInput={onChangeInput} data={data} />
    </form>
  )
}

AccreditationsDetailsForm.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default AccreditationsDetailsForm
