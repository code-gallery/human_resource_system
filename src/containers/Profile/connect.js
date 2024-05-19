import { connect } from 'react-redux'
import {
  fetchUserProfile,
  fetchActivities,
  deleteJob,
  deleteEducation,
  deleteAward,
  saveAward,
  saveEntity,
  editEntity,
  editAward,
  verifyAward,
  verifyEntity,
  updateUserProfile
} from 'store/auth'
import { fetchOtherUserProfile } from 'store/userProfile'
import { setEditMode } from 'store/layout'
import Component from './Profile.js'

export const mapState = ({ auth, reference, userProfile, navigation }, { match }) => ({
  user: !match.params.uid ? auth.user || {} : userProfile.user || {},
  userProfileError: userProfile.error,
  pending: !match.params.uid ? auth.pending : userProfile.pending,
  saveErrorMsg: !match.params.uid ? auth.saveErrorMsg : null,
  allAwards: !match.params.uid ? auth.allAwards : userProfile.allAwards,
  jobs: !match.params.uid ? auth.jobs : userProfile.jobs,
  educations: !match.params.uid ? auth.educations : userProfile.educations,
  isMobileNavActive: navigation.isMobileNavActive,
  activities: !match.params.uid ? auth.activities : userProfile.activities,
  reference
})

export const mapDispatch = (dispatch) => ({
  fetchUserProfile: () => dispatch(fetchUserProfile()),
  fetchActivities: () => dispatch(fetchActivities()),
  updateUserProfile: (...args) => dispatch(updateUserProfile(...args)),
  deleteJob: (...args) => dispatch(deleteJob(...args)),
  deleteEducation: (...args) => dispatch(deleteEducation(...args)),
  deleteAward: (...args) => dispatch(deleteAward(...args)),
  saveAward: (...args) => dispatch(saveAward(...args)),
  saveEntity: (...args) => dispatch(saveEntity(...args)),
  editEntity: (...args) => dispatch(editEntity(...args)),
  editAward: (...args) => dispatch(editAward(...args)),
  verifyAward: (data) => dispatch(verifyAward(data)),
  verifyEntity: (data) => dispatch(verifyEntity(data)),
  fetchOtherUserProfile: (...args) => dispatch(fetchOtherUserProfile(...args)),
  setEditMode: (data) => dispatch(setEditMode(data))
})

export default connect(mapState, mapDispatch)(Component)
