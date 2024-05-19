import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/Avatar'
import 'containers/UserVerifications/style.css'
import { getDetails } from 'containers/UserVerifications/components/VerificationItem'
import Action from '../Action'

class RequestItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showReason: false,
      reasonError: false
    }
  }

  toggleShowReason = () => {
    const { showReason } = this.state
    this.setState({
      showReason: !showReason
    })
  }

  onConfirm = () => {
    const { item } = this.props
    const state = this.state
    const reasons = []
    this.setState({ reasonError: false })

    for (const prop in state) {
      if (prop.indexOf('reason-') !== -1 && state[prop].reason !== '') {
        reasons.push({
          label: state[prop].label,
          reason: state[prop].reason
        })
      }
    }

    if (reasons.length === 0) {
      this.setState({ reasonError: true })
    } else {
      // at least one reason for rejecting claim
      this.props.onReject(item.id, reasons)
    }
  }

  onChangeInput = ({ name, label, reason }) => {
    this.setState({
      [name]: { label, reason }
    })
  }

  render() {
    const { item, onVerify } = this.props
    const { showReason, reasonError } = this.state
    const payload = JSON.parse(item.payload)
    const details = getDetails(payload)
    const name = `${item.user.first_name} ${item.user.last_name}`
    const { type } = item

    return (
      <tr className="VerificationItem">
        <td className="col-xs-12 col-md-3">
          <Avatar
            size="45"
            theme="blue"
            label={name}
            imageUrl={item.user.profile_image}
          />
        </td>
        <td className="col-xs-12 col-md-2 text-center">
          <p className="VerificationItem-type">
            {type}
          </p>
        </td>
        <td className="col-xs-12 col-md-4">
          <ul className="table-list">
            {
              details.map((text, index) => {
                const name = `reason-${index}`
                return (
                  <li className="details" key={index}>
                    <span>{text}</span>
                    {showReason &&
                      <input
                        type="text"
                        placeholder="Suggested change"
                        onChange={(event) => {
                          this.onChangeInput({
                            name,
                            label: text,
                            reason: event.target.value
                          })
                        }}
                      />
                    }
                  </li>
                )
              })
            }
          </ul>
        </td>
        <td className="col-xs-12 col-md-3">
          <Action
            id={item.id}
            showReason={showReason}
            reasonError={reasonError}
            onVerify={onVerify}
            toggle={this.toggleShowReason}
            onConfirm={this.onConfirm}
          />
        </td>
      </tr>
    )
  }
}

RequestItem.propTypes = {
  item: PropTypes.shape({
    payload: PropTypes.string,
    type: PropTypes.string,
    decline_reason: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }),
  onVerify: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
}

export default RequestItem
