import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

class LabeledTextInput extends Component {
  state = {
    value: this.props.initialValue
  }

  componentDidUpdate(prevProps){
    if(prevProps.initialValue !== this.props.initialValue){
      this.setState({
        value: this.props.initialValue
      })
      this.props.onValueChange(this.props.initialValue)
    }
  }

  handleChange = () => {
    const newInputValue = this.input.value
    this.props.onValueChange(newInputValue)
    this.setState({
      value: newInputValue
    })

  }

  handleChange1 = (e) => {
    const newInputValue = this.input.value
    const re = /^\d*\.?\d*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
    this.props.onValueChange(newInputValue)
    this.setState({
      value: newInputValue
    })
  }
  }

  getInputElem = (elem) => {
    this.input = elem
  }
   isNumber =(evt) =>{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  render() {
    const {
      className,
      label,
      labelCurr,
      placeholder
    } = this.props

    return (
      <label className={`LabeledTextInput ${className}`}>
         <span className="LabeledTextInput__txt">{label} {this.props.fontBold ?<b>{labelCurr}</b>: ''}</span>
     {label === 'Employee Liability £m' &&
        <input
          className="LabeledTextInput__input"
          type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange1}
          ref={this.getInputElem}

        />
    }


{label === 'Public Liability £m' &&
        <input
          className="LabeledTextInput__input"
          type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange1}
          ref={this.getInputElem}

        />
    }
{label === 'Professional Indemnity £m' &&
        <input
          className="LabeledTextInput__input"
          type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange1}
          ref={this.getInputElem}

        />
    }

{label !== 'Professional Indemnity £m' && label !== 'Public Liability £m' && label !== 'Employee Liability £m' &&
        <input
          className="LabeledTextInput__input"
          type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          ref={this.getInputElem}

        />
    }

      </label>
    )
  }
}

LabeledTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  className: PropTypes.string
}

LabeledTextInput.defaultProps = {
  placeholder: '',
  initialValue: '',
  className: ''
}

export default LabeledTextInput
