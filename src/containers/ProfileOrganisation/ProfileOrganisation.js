import React from 'react'
import PropTypes from 'prop-types'
import Notifications, { notify } from 'react-notify-toast'
import _isNil from 'lodash/isNil'
import _assign from 'lodash/assign'
import Layout from 'containers/Layout'
import { NOTIFICATION_TIMEOUT } from 'containers/constants'
import Form from 'components/Abstract/Form'
import LoadingIndicator from 'components/LoadingIndicator'
import { HeroBlock, ProfileInfo } from 'components/Profile'
import PageContent from './components/PageContent'
import './style.css'

class ProfileOrganisation extends Form {
  constructor(props) {
    super(props)
    this.saving = false
    this.errorMessageMap = {
      'about_us': 'Please enter "About" information',
      town: 'Please select a location',
      name: 'Please enter a name',
      specialities: 'Please select 1 or more specialities',
      'company_size': 'Please select "Company Size"',
      'year_founded': 'Please enter "Year Founded"',
      industries: 'Please select an industry'
    }
  }

  componentWillMount() {
    const { orgId } = this.props.match.params
    this.resetState([])
    this.fetchData(orgId)
  }

  componentWillReceiveProps(nextProps) {
    const { orgId } = this.props.match.params
    const nextOrgId = nextProps.match.params.orgId
    if (orgId !== nextProps.match.params.orgId) {
      this.fetchData(nextOrgId)
    } else if (nextProps.editMode && this.props.editMode !== nextProps.editMode) {
      this.setState({
        bannerImageTmp: nextProps.organisation.banner_image,
        logoImageTmp: nextProps.organisation.logo_image
      })
    }

    if (this.saving) {
      if (this.props.organisation.pending && !nextProps.organisation.pending) {
        this.saving = false
        // saved successfully
        this.props.setEditMode(false)
        this.notifyFn('Organisation was updated  successfully', 'success')
      } else if (this.props.organisation.saveErrorMsg !== nextProps.organisation.saveErrorMsg) {
        // server error while saving
        this.saving = false
        this.notifyFn(nextProps.organisation.saveErrorMsg, 'error')
      }
    }
  }

  fetchData(orgId) {
    this.props.fetch({ orgId })
    this.props.fetchEmployees({ orgId })
    this.props.fetchAdmins({ orgId })
    this.props.fetchVerifiedStudents({ orgId })
    this.props.fetchReference()
  }

  resetState(errors) {
    this.setState({
      about_us: void 0,
      company_size: void 0,
      name: void 0,
      town: void 0,
      country: void 0,
      year_founded: void 0,
      industries: void 0,
      specialities: void 0,
      bannerImageTmp: void 0,
      logoImageTmp: void 0,
      errors
    })
  }

  validateAndGetChanges() {
    const state = this.state
    const { organisation } = this.props
    const fields = [
      'about_us', 'town', 'country', 'name', 'specialities',
      'company_size', 'year_founded', 'industries'
    ]
    const data = _assign({}, organisation, this.state)
    for (const prop in data) {
      if (data[prop] === void 0) {
        delete data[prop]
      }
    }

    const errors = []
    let town
    let country

    if (state.location && state.location.formatted_address) {
      const tmp = state.location.formatted_address.split(',')
      town = tmp[0].trim()
      country = tmp[1].trim()
    }

    if (town) {
      data.town = town
    }
    if (country) {
      data.country = country
    }

    for (const prop in data) {
      if (fields.indexOf(prop) !== -1 && (_isNil(data[prop]) || data[prop] === '')) {
        errors.push(prop)
        delete data[prop]
      } else if (fields.indexOf(prop) === -1) {
        delete data[prop]
      }
    }

    if (state.bannerImageTmp) {
      data.banner_image = state.bannerImageTmp
    }

    if (state.logoImageTmp) {
      data.logo_image = state.logoImageTmp
    }

    return {
      data,
      errors
    }
  }

  notifyFn(message, type) {
    // this is a wrapper function to make the unit test happy
    notify.show(message, type, NOTIFICATION_TIMEOUT)
  }

  saveChanges = () => {
    const { orgId } = this.props.match.params
    const { data, errors } = this.validateAndGetChanges()
    data.orgId = orgId

    if (errors.length === 0) {
      this.saving = true
      this.props.save(data)
      this.resetState([])
    } else {
      this.setState({ errors })
      this.notifyFn(this.errorMessageMap[errors[0]], 'error')
    }
  }

  undoChanges = () => {
    this.resetState([])
  }

  onImagePick = (evt, field) => {
    const image = evt.target.files[0]
    if (image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (data) => {
        if (field === 'background_image') {
          this.setState({
            bannerImageTmp: data.target.result
          })
        } else {
          this.setState({
            logoImageTmp: data.target.result
          })
        }
      }
    }
  }

  updateProfileImage = (image) => {
    this.setState({
      logoImageTmp: image
    })
  }

  render() {
    const { organisation, editMode, reference, setEditMode } = this.props
    const { loadingRequests } = organisation
    const { errors, bannerImageTmp, logoImageTmp } = this.state
    const orgBannerImage = bannerImageTmp || organisation.banner_image
    if (logoImageTmp) {
      organisation.logo_image_copy = organisation.logo_image
      organisation.logo_image = logoImageTmp
    } else if (organisation.logo_image_copy &&
      organisation.logo_image_copy.indexOf('://') !== -1) {
      organisation.logo_image = organisation.logo_image_copy
      delete organisation.logo_image_copy
    }

    if (loadingRequests < 2 || organisation.pending) {
      // this page makes 3 requests
      return (
        <Layout editLabel="Edit Organisation">
          <Notifications />
          <LoadingIndicator size="80" />
        </Layout>
      )
    }

    return (
      <Layout
        editLabel="Edit Organisation"
        saveChanges={this.saveChanges}
        undoChanges={this.undoChanges}
      >
        <Notifications />
        <HeroBlock
          background_image={orgBannerImage}
          onImagePick={this.onImagePick}
        />

        <ProfileInfo
          data={organisation}
          isProfilePage={false}
          displayContact={false}
          editMode={editMode}
          updateProfileImage={this.updateProfileImage}
          onImagePick={this.onImagePick}
          setEditMode={setEditMode}
        />

        <PageContent
          editMode={editMode}
          organisation={organisation}
          onChangeInput={this.onChangeInput}
          reference={reference}
          errors={errors}
        />

      </Layout>
    )
  }
}

ProfileOrganisation.defaultProps = {
  editMode: false
}

ProfileOrganisation.propTypes = {
  editMode: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired,
  fetchReference: PropTypes.func.isRequired,
  fetchEmployees: PropTypes.func.isRequired,
  fetchAdmins: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }),
  organisation: PropTypes.shape({
    banner_image: PropTypes.string,
    background_color: PropTypes.string,
    specialities: PropTypes.string,
    loadingRequests: PropTypes.number.isRequired,
    pending: PropTypes.bool.isRequired,
    saveErrorMsg: PropTypes.oneOfType([
      PropTypes.object, PropTypes.string
    ])
  }),
  reference: PropTypes.shape({
    awards: PropTypes.array,
    degrees: PropTypes.array,
    industries: PropTypes.array
  }),
  save: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired
}

export default ProfileOrganisation
