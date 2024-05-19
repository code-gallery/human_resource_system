import { connect } from 'react-redux'
import { requestOrganisationConfig, postNewRequest, resetNewRequest } from './reducer'
import { requestCandidate } from 'containers/OrganisationCandidate/reducer'
import {fetchClientOrganisations, clientOrganisationsfilter, fetchUserPersona, fetchUserChecks} from 'store/auth'
import OrganisationCandidateNewRequest from './OrganisationCandidateNewRequest'

const mapStateToProps = ({ workPassRequest, candidate ,auth}) => ({
  workPassRequest,
  candidate,
  client_org: auth.client_org,
  workPassPersonas : auth.workPassPersonas,
  workPassChecks : auth.workPassChecks,
})

const mapDispatchToProps = {
  requestOrganisationConfig,
  requestCandidate,
  postNewRequest,
  resetNewRequest,
  fetchClientOrganisations,
  clientOrganisationsfilter,
  fetchUserPersona,
  fetchUserChecks
}

const OrganisationCandidateNewRequestContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationCandidateNewRequest)

export default OrganisationCandidateNewRequestContainer
