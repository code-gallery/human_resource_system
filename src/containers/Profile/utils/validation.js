import classNames from 'classnames'

export const renderValidation = function(invalidFields, field) {
  return classNames({ 'required-error': invalidFields.indexOf(field) !== -1 })
}
