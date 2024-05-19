import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _isNil from 'lodash/isNil'
import AvatarEditor from 'react-avatar-editor'
import fetchJsonp from 'fetch-jsonp'
import Modal from 'react-modal'
import 'fetch-instagram'
import { INSTAGRAM_ID, getApiUrl } from 'containers/constants'
import ImagePicker from 'components/Profile/ImagePicker'
import Assets from 'components/AvatarBig/assets'
import VerifiedEmployees from './VerifiedEmployees'
import Contact from './Contact'
import ContentProfile from './ContentProfile'
import ContentProfileOrg from './ContentProfileOrg'
import './style.css'

function makeFacebookPhotoURL(id, accessToken) {
  return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken
}

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index)
}

function login(callback) {
  window.FB.login(function (response) {
    if (response.authResponse) {
      if (callback) {
        callback(response)
      }
    }
  }, { scope: 'user_photos' })
}

function getAlbums(callback) {
  window.FB.api(
    '/me/albums',
    { fields: 'id,cover_photo' },
    function (albumResponse) {
      if (callback) {
        callback(albumResponse)
      }
    }
  )
}

function getPhotosForAlbumId(data) {
  const promisesList = []
  for (let i = 0; i < data.length; i++) {
    promisesList.push(
      new Promise((resolve, reject) => {
        window.FB.api(
          '/' + data[i].id + '/photos',
          { fields: 'id' },
          function (response) {
            if (response.data) {
              resolve(response.data)
            } else {
              reject()
            }
          }
        )
      })
    )
  }
  return Promise.all(promisesList)
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
}

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isContactDropdownOpen: false,
      crop: 1,
      editProfileImage: false,
      modalIsOpen: false,
      image: null,
      social_photos: [],
      prefix: '/',
      rotateImage: 0
    }
  }

  componentDidMount() {
    const hashString = window.location.hash
    if (hashString.includes('access_token')) {
      window.history.pushState('', document.title, window.location.pathname)
      const token = hashString.substr(hashString.indexOf('=') + 1, hashString.length)

      fetchJsonp('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token)
        .then(function (response) {
          return response.json()
        }).then((res) => {
          if (res.data && res.data.length) {
            let social_photos = []
            social_photos = res.data.map((item) => {
              return { url: item.images.low_resolution.url }
            })

            // redirect bring back to page, so put Page in edit mode
            this.props.setEditMode(true)

            this.setState({
              modalIsOpen: true,
              editProfileImage: true,
              social_photos
            })
          }
        })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editMode !== nextProps.editMode) {
      this.setState({ rotateImage: 0 })
    }

    if (nextProps.editMode === false) {
      this.setState({ editProfileImage: false })
    }
  }

  toggleContact = () => {
    this.setState({
      isContactDropdownOpen: !this.state.isContactDropdownOpen
    })
  }

  toggleDropdown = () => {
    this.toggleShowContacts()
  }

  enableEditProfileImage() {
    if (this.props.editMode && !this.state.editProfileImage) {
      this.setState({
        editProfileImage: true
      })
    }
  }

  disableEditProfileImage() {
    if (this.props.editMode && this.state.editProfileImage) {
      this.setState({
        editProfileImage: false
      })
    }
  }

  onSave() {
    const canvas = this.editor.getImage()
    const jpgUrl = canvas.toDataURL('image/jpeg')
    this.props.updateProfileImage(jpgUrl)
    this.setState({
      editProfileImage: false
    })
  }

  getPhotos(callback) {
    let accessToken = ''
    login(function (loginResponse) {
      accessToken = loginResponse.authResponse.accessToken || ''
      getAlbums(function (albumResponse) {
        getPhotosForAlbumId(albumResponse.data).then((res) => {
          const myNewArray = res.reduce(function (prev, curr) {
            return prev.concat(curr)
          })
          let facebookPhotos = []
          if (myNewArray && myNewArray.length) {
            facebookPhotos = myNewArray.map((photo) => {
              return ({
                'id': photo.id,
                'url': makeFacebookPhotoURL(photo.id, accessToken)
              })
            })
            if (callback) {
              callback(facebookPhotos)
            }
          }
        })
      })
    })
  }

  onPick = (image) => {
    this.setState({ image })
  }

  facebookImages = () => {
    this.getPhotos((photos) => {
      if (photos.length) {
        this.setState({ modalIsOpen: true, social_photos: photos })
      }
    })
  }

  instagramImages = () => {
    let redirectUri = this.props.redirectUri || window.location.href
    const indexOf = redirectUri.indexOf('organisations/')
    if (indexOf !== -1) {
      // redirectUri becomes organisations/?id=
      redirectUri = insert(redirectUri, indexOf + 14, '?id=')
    }
    const params = `?client_id=${INSTAGRAM_ID}&redirect_uri=${redirectUri}&scope=basic&response_type=token`
    window.location.href = `https://api.instagram.com/oauth/authorize/${params}`
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = (image) => {
    this.setState({ modalIsOpen: false })
    if (image) {
      this.props.updateProfileImage(image.src)
    }
  }

  setEditorRef = (editor) => {
    this.editor = editor
  }

  rotateImageHandler = () => {
    const { rotateImage } = this.state
    this.setState({
      rotateImage: rotateImage + 45
    })
  }

  render() {
    const {
      editMode,
      onImagePick,
      displayContact,
      isProfilePage,
      data,
      allAwards,
      educations,
      jobs
    } = this.props
    const { rotateImage } = this.state
    let profileImage = (isProfilePage) ? data.profile_image : data.logo_image
    if (editMode && profileImage.indexOf('base64') === -1) {
      profileImage = (isProfilePage) ?
        getApiUrl('profileImage').replace(':id', data.id) :
        getApiUrl('logoImage').replace(':orgId', data.id)
    } else if (profileImage && profileImage.indexOf('https://') !== -1) {
      const d = new Date().getTime()
      profileImage = `${profileImage}?v=${d}`
    } else if (_isNil(profileImage) || profileImage.indexOf('http://') !== -1) {
      // use default image
      profileImage = Assets.placeholder
    }
    const { isContactDropdownOpen, editProfileImage, social_photos } = this.state
    const cssUserImg = classNames('main-userpic', {
      'overlay': editMode && !editProfileImage
    })

    const profileClass = classNames('ProfileInfo', { 'OrgProfileInfo': !isProfilePage })
    return (
      <section className={profileClass}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          overlayClassName={{
            afterOpen: 'myOverlayClass_after-open'
          }}
        >
          <div className="modal-body">
            <h3>Choose a picture</h3>
            <ImagePicker
              images={social_photos.map((image, i) => ({ src: image.url, value: i }))}
              onPick={this.onPick}
            />
            <div className="modal-footer">
              <div className="bottom-block">
                <button type="button" onClick={() => this.closeModal(this.state.image)}>Cancel</button>
                <button type="button" onClick={() => this.closeModal(this.state.image)}>OK</button>
              </div>
            </div>
          </div>
        </Modal>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-9">
              <div
                className={cssUserImg}
                onClick={this.enableEditProfileImage.bind(this)}
              >
                {
                  !editProfileImage &&
                    <div>
                      <img src={profileImage} alt="profile" />
                      <label className={`img-custom-file-upload ${editMode ? 'edit-mode' : ''}`}>
                        <span>Change your <br /> profile picture</span>
                      </label>
                    </div>
                }
                {
                  editProfileImage &&
                    <div>
                      <AvatarEditor
                        ref={this.setEditorRef}
                        image={profileImage}
                        width={window.innerWidth < 991 ? 154 : 202}
                        height={window.innerWidth < 991 ? 154 : 202}
                        border={0}
                        scale={Number(this.state.crop)}
                        rotate={rotateImage}
                        crossOrigin="anonymous"
                        style={{
                          borderRadius: '50%'
                        }}
                        className="main-userpic-canvas"
                      />
                      <div className="main-userpic-control">
                        <div
                          className="rotate-btn"
                          onClick={this.rotateImageHandler}>
                          Rotate
                        </div>
                        <div className="crop-control">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.1"
                            value={this.state.crop}
                            style={{
                              width: '100%'
                            }}
                            onChange={(event) => {
                              this.setState({
                                crop: event.target.value
                              })
                            }}
                          />
                        </div>
                        <ul>
                          <li>
                            <label className="link-file-upload">
                              <input
                                type="file"
                                accept="image/*"
                                value=""
                                onChange={(e) => onImagePick(e, 'profile_image')}
                              />
                              <span>Upload a picture</span>
                            </label>
                          </li>
                          {/* Disable Facebook and Instagram for 08/11 release
                          <li><a className="i-in" onClick={this.instagramImages}>Add from Instagram</a></li>
                          <li><a className="i-fb" onClick={this.facebookImages}>Add from Facebook</a></li>
                          */}
                        </ul>
                        <div className="main-userpic-control-btn">
                          <button
                            className="uc-cancel"
                            onClick={this.disableEditProfileImage.bind(this)}
                          >&nbsp;</button>
                          <button
                            className="uc-done"
                            onClick={this.onSave.bind(this)}
                          >&nbsp;</button>
                        </div>
                      </div>
                    </div>
                }
              </div>
              {isProfilePage &&
                <ContentProfile
                  user={data}
                  allAwards={allAwards}
                  educations={educations}
                  jobs={jobs} />
              }
              {displayContact &&
                <Contact
                  isMobile={true}
                  editMode={editMode}
                  user={data}
                  active={isContactDropdownOpen}
                  onToggle={this.toggleContact}
                />
              }
              {!isProfilePage &&
                <ContentProfileOrg data={data} />
              }
            </div>
            {displayContact &&
              <div className="col-md-3 col-lg-3 hidden-sm hidden-xs">
                <Contact
                  isMobile={false}
                  editMode={editMode}
                  user={data}
                  active={isContactDropdownOpen}
                  onToggle={this.toggleContact}
                />
              </div>
            }
            {!isProfilePage &&
              <VerifiedEmployees employees={data.employees} />
            }
          </div>
        </div>
      </section>
    )
  }
}

ProfileInfo.defaultProps = {
  displayContact: true,
  isProfilePage: true
}

ProfileInfo.propTypes = {
  editMode: PropTypes.bool.isRequired,
  displayContact: PropTypes.bool,
  isProfilePage: PropTypes.bool,
  onImagePick: PropTypes.func.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  redirectUri: PropTypes.string,
  allAwards: PropTypes.object,
  educations: PropTypes.array,
  jobs: PropTypes.array,
  data: PropTypes.shape({
    profile_image: PropTypes.string,
    logo_image: PropTypes.string
  }),
  setEditMode: PropTypes.func.isRequired
}

export default ProfileInfo
