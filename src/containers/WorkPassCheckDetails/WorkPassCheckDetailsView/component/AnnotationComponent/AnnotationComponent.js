import React, { Component } from "react";
import Notifications, { notify } from 'react-notify-toast'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import Button from "components/Button";

const checkType = ['employment_reference', 'dbs_identity', 'address_history', 'bank_details', 'company', 'gpdr_declaration', 'criminal_record_declaration', 'work_gaps', 'client_specific_documentation', 'employment_eligibility_verification', 'dbs']
class AnnotationComponent extends Component {
  constructor(props) {
    super();
    const initialstate = {
      complaince_response: props.complaince_response,
      // notes: props.notes,
      notes: '',
      check_id: props.checkId,
      check_type: props.type,
      user_id: props.userID,
      requestId: props.requestId
    };
    this.state = {
      ...initialstate,
    };
  }

  componentDidMount() {
    if (this.state.complaince_response === '' || this.props.complaince_response === '') {
      this.setState({
        complaince_response : "No Status"
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.complaince_response !== this.props.complaince_response) {
      this.setState({
        complaince_response: nextProps.complaince_response
        //notes: nextProps.notes
      })
    }
    if (nextProps.complaince_response === '' && this.props.complaince_response === '') {
      this.setState({
        complaince_response: 'No Status'
      })
    }
  }

  submitComplainceResponse = () => {
    const complaince_response_data = this.state;
    this.props.annotationSubmit(complaince_response_data,
      () =>{notify.show("Response saved successfully.", 'success', NOTIFICATION_TIMEOUT);
        this.setState({
          notes: ""
        })} ,
      () => notify.show('Failed to save response.', 'error', NOTIFICATION_TIMEOUT))
  };

  resetComplainceResponse = () => {
    this.setState((prevState) => {
      /* if(prevState.notes===this.textInput.value){
        return {notes: ' '}
      }
      return { notes: this.textInput.value}
    })*/
      if (this.props.notes === this.state.notes) {
        return { notes: '' }
      }
      return { notes: this.state.notes}
    })
    // this.setState({complaince_response: 'Reset'}, this.reset)
    this.setState({ complaince_response: 'Reset' },
      () => { this.props.annotationReset(this.state); }
    )
  };

  /* reset = () => {
    const checkId = this.state.check_id
    const type = this.state.check_type
    const complaince_response_data = this.state;
    complaince_response_data.orgId = this.props.orgId
    let myColor = { background: '#f0909d', text: "#141414" };
    this.props.annotationReset(complaince_response_data,
      () =>{notify.show("Response has been reset successfully.", 'custom', NOTIFICATION_TIMEOUT, myColor)} ,
      () => notify.show('Failed to reset response.', 'error', NOTIFICATION_TIMEOUT), this.props.orgId) 
  } */

  updateCheck = (check) => {
    if (this.props.complaince_response === 'Approved' || this.props.complaince_response === 'Waiver') {
      return null
    } else {
      this.setState({ complaince_response: check });
    }
  }

  render() {
    const { complaince_response, check_type } = this.state
    const referenceCount = this.props.refernceCount ? this.props.refernceCount : 0
    return (
      <div className="row form-group card-row annotation-section margin20">
        <Notifications />
        <div className="col-md-3">
          <h4 className="card-title form-group">COMPLIANCE OFFICER</h4>
          <div className="margin form-checkbox">
            <input
              type="checkbox"
              id="approved"
              name="approved"
              key={complaince_response}
              checked={complaince_response === "Approved"}
              onChange={() => {
                this.updateCheck("Approved")
              }}
              disabled={!this.props.isEditable}
            />
            <label htmlFor="approved">Approved</label>
          </div>
          <div className="margin form-checkbox">
            <input
              type="checkbox"
              id="waiver"
              name="waiver"
              checked={complaince_response === "Waiver"}
              onChange={() => {
                this.updateCheck("Waiver")
              }}
              disabled={!this.props.isEditable}
            />
            <label htmlFor="waiver">Waiver</label>
          </div>
          <div className="margin form-checkbox">
            <input
              type="checkbox"
              id="notApproved"
              name="notApproved"
              checked={complaince_response === "Not Approved"}
              onChange={() => {
                this.updateCheck("Not Approved")
              }}
              disabled={!this.props.isEditable}
            />
            <label htmlFor="notApproved">Not Approved</label>
          </div>
        </div>
        <div className="col-md-9">
          <h4 className="card-title form-group">NOTES</h4>
          <textarea
            className="fullBox"
            value={this.state.notes}
            ref={e => this.textInput = e}
            onChange={(val) => {
              this.setState({ notes: val.target.value });
            }}
            disabled={!this.props.isEditable}
          ></textarea>
        </div>
        {/* <button
          className="CandidateNewRequestsHeader__btn NewRequestButton submitBtn"
          role="button"
          disabled={(this.state.complaince_response===""||this.state.complaince_response==="No Status")&& this.state.notes===""}
          onClick={this.submitComplainceResponse}
        >
          Save
        </button> */}
        <div className='col-md-12'>
          <Button color="blue"
            className="annotation-btn"
            onClick={this.submitComplainceResponse}
            disabled={!this.props.isEditable || ((this.state.complaince_response === '' || this.state.complaince_response === 'No Status') && this.state.notes === '')}
          >Save</Button>
          {(checkType.includes(check_type)) &&
            this.props.side === 'candidate' && this.props.check_status === 'complete' && !this.props.resetSuccess.success ?
            <Button
              color="red"
              className="annotation-btn"
              onClick={ this.resetComplainceResponse }
              disabled={!this.props.isEditable}
            >Reset</Button>
            : '' }
          { (this.props.check_status === 'pending' && referenceCount >= 2 && this.props.gapArray && this.props.gapArray.length === 0 ) &&
            <Button color="blue"
              className="annotation-btn"
              onClick={ this.props.workpassSubmit }
              disabled={!this.props.isEditable}
            >Complete</Button>
          }
        </div>
      </div>
    );
  }
}

export default AnnotationComponent;
