import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput(event) {
    const target = event.target
    let value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if (value.text) {
      // react-select
      value = value.text
    }

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        This is an Abstract component. Only inherit from this.
      </div>
    )
  }
}

export default Form
