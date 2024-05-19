import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import isNull from 'lodash/isNull'
import WorkPassSideMenu from 'components/WorkPassSideMenu'
import Candidate from '../OrganisationCandidate/Candidate'
import UserData from './UserData'
import Layout from 'containers/Layout'
import { getApiUrl, ROUTE_URL } from 'containers/constants'
import httpFetch from 'utils/httpFetch'
import Loader from "components/Loader";
import WorkPassMain from 'components/WorkPassMain'
import ManuallyCompleted from './ManuallyCompleted'
import '../../containers/WorkPassViewRequestData/UserData/style.css'

class WorkPassViewRequestData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false
    }
  }

  componentDidMount() {
    const { requestId, orgId, candidateId } = this.getUrlParams()
    const { getRequest, requestCandidate } = this.props

    getRequest(requestId)
    requestCandidate(orgId, candidateId)
  }

  getUrlParams() {
    const {
      params: {
        orgId,
        candidateId,
        requestId,
        vOrgId
      }
    } = this.props.match

    return {
      orgId: parseInt(orgId, 10),
      candidateId: parseInt(candidateId, 10),
      requestId: parseInt(requestId, 10),
      vOrgId: parseInt(vOrgId, 10)
    }
  }

  /** @NOTE: should I show the loading icon? */
  isLoading() {
    const { fetchingCandidate, candidate, request } = this.props
    return fetchingCandidate || isNull(candidate) || !Array.isArray((request || {}).checks)
  }

  confirmCandidate = async () => {
    this.setState({ submitting: true });
    const { requestId, candidateId, orgId } = this.getUrlParams()

    const url = getApiUrl('confirmRequest').replace(':requestId', requestId)
    const response = await httpFetch(url, { method: 'POST' })
    this.setState({ submitting: false });

    /** @TODO: Handle unsuccesful response */
    if (response.data.success) {
      const candidatePath = ROUTE_URL.organisationCandidate
        .replace(':orgId', orgId)
        .replace(':candidateId', candidateId)
      this.props.history.push(candidatePath)
    }

  }

  render() {
    const { candidate, error, request, organisationBalance } = this.props
    const { requestId } = this.getUrlParams()
    const checks = (request || {}).checks
    const candidateInfo = (request || {}).candidate
    const biometricData = (request || {}).BiometricDetails

    if (biometricData !== undefined && biometricData !== '' && biometricData.length > 0) {
      var biometricDetails = []
      const data = {
        biometricstatus: biometricData[0].biometrics_status
      }
      biometricDetails.push(data)
    }

    if (candidateInfo !== undefined) {
      var personalData = candidateInfo.personalData
      if (personalData !== null) {
        personalData.validation = request.Validation
        personalData = [personalData]
      } else {
        personalData = []
      }
    }

    const { orgId, vOrgId } = this.getUrlParams()
    const isLoading = this.isLoading()
    if (error) {
      return <Redirect to="/profile" />
    }

    if (this.state.submitting) {
      return (
        <Layout showFooter={false} responsive={false}>
          <WorkPassSideMenu organisationId={orgId} />
          <WorkPassMain>
            <div className="Userdata__loader">
              <Loader size={65} color="#72d371" />
            </div>
          </WorkPassMain>
        </Layout>
      )
    }

    return (
      <Layout showFooter={false} responsive={false}>
        <WorkPassSideMenu organisationId={orgId} />
        <Candidate
          orgId={orgId}
          vOrgId={vOrgId}
          candidate={candidate}
          loading={isLoading}
          organisationBalance={organisationBalance.balance}
          requestId={requestId}
          showReturnBtn={true}
        >

          {!isLoading && personalData
            .map(() => (
              <UserData
                key="personal_Info"
                type="personal_info"
                side="candidate"
                data={personalData}
                status="complete"
              />
            ))}

          {!isLoading && checks
            .map(({ id, type, side, data, status, options }) => (
            <div key={id}>
              {options.manual ? 
                <ManuallyCompleted type={type}/>
                : type === 'biometric_identity' ? 
                <UserData
                  key={id}
                  type={type}
                  side={side}
                  data={biometricDetails}
                  status={status}
                /> 
                : 
                <UserData
                key={id}
                type={type}
                side={side}
                data={data}
                status={status}
              />}
            </div> 
            ))}
          {/* {
            request && request.status === 'submitted' &&
              <Button onClick={this.confirmCandidate}>
                Confirm &amp; Commit Data
              </Button>
          } */}
        </Candidate>
      </Layout>
    )
  }
}

WorkPassViewRequestData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  candidate: PropTypes.object,
  fetchingCandidate: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  request: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  getRequest: PropTypes.func.isRequired,
  requestCandidate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  organisationBalance: PropTypes.object.isRequired
}

export default WorkPassViewRequestData
