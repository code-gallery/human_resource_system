import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TwitterInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
    this.defaultValue = '@'
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      value: nextProps.value || ''
    })
  }

  onChangeHandler = (e) => {
    const { onChangeInput } = this.props

    if (e.target.value[0] !== this.defaultValue) {
      onChangeInput(this.defaultValue + e.target.value)
    } else {
      onChangeInput(e.target.value)
    }
  }

  render() {
    const { value } = this.state

    return (
      <input
        type="text"
        value={value}
        onChange={this.onChangeHandler}
      />
    )
  }
}

TwitterInput.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default TwitterInput
