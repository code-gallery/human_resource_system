import { connect } from 'react-redux'
import {addNewDocument, fetchDocumentTable, setCurrentPage, setSearchQuery, editDocumentTable, getDocPersona, searchDocuments, updateDocument } from './reducer'

import Component from './OrganisationDocuments'
import {fetchClientOrganisations, fetchUserPersona} from 'store/auth'
export const mapStateToProps = ({ organisationBalance, organisationDocument, auth}, { match }) => ({
  organisationBalance,
  organisationDocument: organisationDocument,
  associatedOrgs: auth.client_org,
  workPassPersonas: auth.workPassPersonas
})

export const mapDispatchToProps = (dispatch) => ({
  fetchClientOrganisations: (id) => dispatch(fetchClientOrganisations(id)),
  fetchDocumentTable: (data) => dispatch(fetchDocumentTable(data)), 
  editDocumentTable:(...args)=> dispatch(editDocumentTable(...args)),
  addNewDocument: (...args) => dispatch(addNewDocument(...args)),
  setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage)),
  setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  fetchUserPersona: (...args) => dispatch(fetchUserPersona(...args)),
  getDocPersona: (...args) => dispatch(getDocPersona(...args)),
  searchDocuments: (...args) => dispatch(searchDocuments(...args)),
  updateDocument: (...args) => dispatch(updateDocument(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
