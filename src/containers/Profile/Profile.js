import React from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import ContentCard from 'components/ContentCard'
import LoadingIndicator from 'components/LoadingIndicator'
import { HeroBlock, ProfileInfo } from 'components/Profile'
import AppBanner from 'components/Abstract/AppBanner'
import PageContent from './components/PageContent'

class Profile extends AppBanner {
  constructor(props) {
    super(props)
    this.checkBiometricStatus = false
    this.saving = false
    this.state = {
      user: props.user
    }
  }

  componentWillMount() {
    const { uid } = this.props.match.params || ''
    if (uid) {
      // fetch profile data of another user
      this.checkBiometricStatus = parseInt(uid, 10) > 0
      this.props.fetchOtherUserProfile(uid)
    } else {
      // fetch your own profile
      this.props.fetchActivities()
      this.props.fetchUserProfile()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        user: nextProps.user
      })
      this.user = nextProps.user
    }

    if (this.saving) {
      if (this.props.saveErrorMsg !== nextProps.saveErrorMsg && nextProps.saveErrorMsg !== null) {
        // server error while saving
        this.saving = false
        this.notifyFn(nextProps.saveErrorMsg, 'error')
      } else if (this.props.pending && !nextProps.pending) {
        this.saving = false
        // saved successfully
        this.props.setEditMode(false)
        this.notifyFn('Profile was updated  successfully', 'success')
      }
    }
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }

  saveChanges = () => {
    this.saving = true
    this.props.fetchUserProfile()
    const { user } = this.state
    if (user.first_name !== '' && user.last_name !== '') {
      this.props.updateUserProfile(user)
    } else {
      this.notifyFn('"First Name" and "Last Name" are mandatory', 'error')
    }
  }

  undoChanges = () => {
    this.setState({
      user: this.user
    })
  }

  deleteAward = (id, type) => {
    this.props.deleteAward({ id, type },
      () => notify.show(`Award "${type}" deleted successfully`, 'success', NOTIFICATION_TIMEOUT),
      () => notify.show(`Award "${type}" was not deleted. Please try again`, 'error', NOTIFICATION_TIMEOUT)
    )
  }

  deleteWork = (id) => {
    this.props.deleteJob({ id },
      () => notify.show('Work deleted successfully', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to delete. Please try again', 'error', NOTIFICATION_TIMEOUT)
    )
  }

  deleteEducation = (id) => {
    this.props.deleteEducation({ id },
      () => notify.show('Education deleted successfully', 'success', NOTIFICATION_TIMEOUT),
      () => notify.show('Failed to delete. Please try again', 'error', NOTIFICATION_TIMEOUT)
    )
  }

  genericError() {
    notify.show('Failed to save. Please try again', 'error', NOTIFICATION_TIMEOUT)
  }

  saveAward = (data, verify) => {
    if (data.id) {
      if (verify === 'verified') {
        this.props.editAward(data,
          () => {
            notify.show('Award was edited successfully.', 'success', NOTIFICATION_TIMEOUT)
          },
          this.genericError
        )
      } else {
        this.props.editAward(data,
          (award_data) => {
            if (verify) {
              this.props.verifyAward({ id: award_data.id, type: award_data.type })
            }
            notify.show('Award was edited successfully.', 'success', NOTIFICATION_TIMEOUT)
          },
          this.genericError
        )
      }
    } else {
      this.props.saveAward(data,
        (award_data) => {
          if (verify) {
            this.props.verifyAward({ id: award_data.id, type: award_data.type })
          }
          notify.show('Award was created successfully', 'success', NOTIFICATION_TIMEOUT)
        },
        this.genericError
      )
    }
  }

  saveEntity = (data, verify) => {
    this.props.fetchUserProfile()
    if (data.id) {
      if (verify === 'verified') {
        this.props.editEntity(data,
          () => {
            notify.show('Entity was edited successfully', 'success', NOTIFICATION_TIMEOUT)
          },
          this.genericError
        )
      } else {
        this.props.editEntity(data,
          (entity_data) => {
            if (verify) {
              this.props.verifyEntity({ id: entity_data.id, type: data.entity_type })
            }
            notify.show('Entity was edited successfully', 'success', NOTIFICATION_TIMEOUT)
          },
          this.genericError
        )
      }
    } else {
      this.props.saveEntity(data,
        (entity_data) => {
          if (verify) {
            this.props.verifyEntity({ id: entity_data.id, type: data.entity_type })
          }
          notify.show('New entity was created successfully', 'success', NOTIFICATION_TIMEOUT)
        },
        this.genericError
      )
    }
  }

  onImagePick = (evt, field) => {
    const image = evt.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = (data) => {
      this.setState({
        user: {
          ...this.state.user,
          [field]: data.target.result
        }
      })
    }
  }

  updateProfileImage = (profile_image) => {
    this.setState({
      user: {
        ...this.state.user,
        profile_image
      }
    })
  }

  onChangeProfileField = (field, value) => {
    if (field === 'location') {
      const { formatted_address } = value
      const addressComponents = formatted_address.split(',')
      const town = addressComponents[0]
      const country = addressComponents[addressComponents.length - 1]
      this.setState({
        user: {
          ...this.state.user,
          town,
          country
        }
      })
      return
    }
    this.setState({
      user: {
        ...this.state.user,
        [field]: value
      }
    })
  }

  filterEntries = (item) => {
    const { uid } = this.props.match.params || ''
    if (uid) {
      if (item.verified_status === 'declined') {
        item.verified_status = 'not_verified'
      }
    }
    return true
  }

  setDisplayContact = () => {
    if (window.innerWidth > 986) {
      return true
    } else {
      return !this.props.isMobileNavActive
    }
  }

  renderProfileNotFound() {
    return (
      <Layout>
        <ContentCard title="Profile not found" className="ContentCard-marginTop">
          <p>Unfortunately, we cannot find the profile you are looking for.</p>
        </ContentCard>
      </Layout>
    )
  }

  renderUnverifiedProfile() {
    return (
      <Layout>
        <ContentCard title="Unverified profile" className="ContentCard-marginTop">
          <p>Unfortunately, you cannot view this profile until it has been biometrically identified.</p>
        </ContentCard>
      </Layout>
    )
  }

  render() {
    const {
      pending,
      allAwards,
      jobs,
      educations,
      reference,
      editMode,
      setEditMode,
      activities,
      userProfileError
    } = this.props
    const { user } = this.state
    const { background_image, biometrics_status } = user
    const showAppBanner = user.first_name && !user.mobile_address

    if (pending) {
      return (
        <Layout>
          <Notifications />
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    if (this.checkBiometricStatus && biometrics_status !== 'complete') {
      // if url is /profile/:number and biometrics_status is not complete
      return this.renderUnverifiedProfile()
    }

    if (userProfileError !== '') {
      return this.renderProfileNotFound()
    }

    return (
      <Layout
        saveChanges={this.saveChanges}
        undoChanges={this.undoChanges}
      >
        <Notifications />
        { showAppBanner && super.render() }
        <HeroBlock
          background_image={background_image}
          onImagePick={this.onImagePick}
        />

        <ProfileInfo
          data={user}
          isProfile={true}
          editMode={editMode}
          onImagePick={this.onImagePick}
          updateProfileImage={this.updateProfileImage}
          allAwards={allAwards}
          educations={educations}
          jobs={jobs}
          displayContact={this.setDisplayContact()}
          setEditMode={setEditMode}
        />
        <PageContent
          user={user}
          allAwards={allAwards}
          educations={educations}
          jobs={jobs}
          reference={reference}
          editMode={editMode}
          pageOrder={user.profile_order}
          onChangeProfileField={this.onChangeProfileField}
          saveAward={this.saveAward}
          deleteAward={this.deleteAward}
          deleteWork={this.deleteWork}
          deleteEducation={this.deleteEducation}
          saveEntity={this.saveEntity}
          filterEntries={this.filterEntries}
          activities={activities}
        />
      </Layout>
    )
  }
}

Profile.defaultProps = {
  editMode: false
}

Profile.propTypes = {
  editMode: PropTypes.bool.isRequired,
  fetchUserProfile: PropTypes.func.isRequired,
  fetchOtherUserProfile: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  saveAward: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  editEntity: PropTypes.func.isRequired,
  editAward: PropTypes.func.isRequired,
  verifyAward: PropTypes.func.isRequired,
  verifyEntity: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  user: PropTypes.shape({
    background_image: PropTypes.string,
    biometrics_status: PropTypes.string,
    profile_order: PropTypes.object
  }),
  userProfileError: PropTypes.string.isRequired,
  allAwards: PropTypes.object,
  jobs: PropTypes.array,
  educations: PropTypes.array,
  pending: PropTypes.bool.isRequired,
  saveErrorMsg: PropTypes.oneOfType([
    PropTypes.object, PropTypes.string
  ]),
  reference: PropTypes.shape({
    awards: PropTypes.array,
    degrees: PropTypes.array,
    industries: PropTypes.array
  }),
  activities: PropTypes.array,
  setEditMode: PropTypes.func.isRequired,
  isMobileNavActive: PropTypes.bool
}

export default Profile
