import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ROUTE_URL, getIntelligentProfileUrl } from 'containers/constants.js'
import Navigation from './Navigation'
import NavigationMobile from './NavigationMobile'
import UserContextMenu from './UserContextMenu'
import Actions from './Actions'
import Icon from 'components/Icon'
import './style.css'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
      showDropdown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isMobileNavActive } = nextProps
    const { showMenu } = this.state
    if (window.innerWidth <= 768 && !isMobileNavActive && showMenu) {
      this.setState({ showMenu: false })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { showDropdown } = nextState
    if (showDropdown) {
      document.addEventListener('click', this.toggleDropDown)
    } else {
      document.removeEventListener('click', this.toggleDropDown)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleDropDown)
  }

  toggleMenu = () => {
    const showMenu = !this.state.showMenu
    this.setState({ showMenu })
    this.props.setMobileNavActive(showMenu)
  }

  toggleDropDown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  renderLoggedIn() {
    const {
      editLabel,
      editMode,
      canEdit,
      saveChanges,
      undoChanges,
      toggleEditMode,
      loading,
      user,
      organisations,
      token,
      isMobileNavActive,
      setMobileNavActive,
      responsive,
      hasNotification
    } = this.props
    const { showMenu, showDropdown } = this.state
    let intelligentLink = false

    if (token && token !== '') {
      intelligentLink = getIntelligentProfileUrl(token, window.location.origin)
    }

    const style = classNames(
      'Header',
      { isDesktop: !responsive },
      { hasNotification }
    )

    const logoStyle = classNames('Header__appii', { isEditMode: editMode })

    return (
      <header className={style}>
        {/* APPII Logo centered in the middle */}
        <Link className={logoStyle} to={ROUTE_URL.home}>
          <Icon type="appii" />
        </Link>

        <div className="container-fluid">
          <div className="row">
            {/* Left Side */}
            <div className="col-md-4">
              <div className="Header__menu-icon" onClick={this.toggleMenu}>
                <Icon type="menu" />
              </div>

              {showMenu && window.innerWidth > 768 &&
                <Navigation
                  user={user}
                  intelligentLink={intelligentLink}
                  toggleMenu={this.toggleMenu}
                />
              }

              {showMenu && window.innerWidth <= 768 &&
                <NavigationMobile
                  user={user}
                  intelligentLink={intelligentLink}
                  active={isMobileNavActive}
                  organisations={organisations}
                  setMobileNavActive={setMobileNavActive}
                  hasNotification={hasNotification}
                />
              }

              <div className="Header__right-mobile hidden-md hidden-lg">
                <Actions
                  editLabel={editLabel}
                  canEdit={canEdit}
                  editMode={editMode}
                  isMobile={true}
                  saveChanges={saveChanges}
                  undoChanges={undoChanges}
                  toggleEditMode={toggleEditMode}
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="col-md-8 hidden-sm hidden-xs">
              <div className="Header__right">
                <Actions
                  editLabel={editLabel}
                  canEdit={canEdit}
                  editMode={editMode}
                  isMobile={false}
                  loading={loading}
                  saveChanges={saveChanges}
                  undoChanges={undoChanges}
                  toggleEditMode={toggleEditMode}
                />
                <UserContextMenu
                  user={user}
                  organisations={organisations}
                  showDropdown={showDropdown}
                  toggleDropDown={this.toggleDropDown}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  renderLoggedOut() {
    return (
      <header className="Header">
        <Link className="Header__appii" to={ROUTE_URL.publicSiteHome}>
          <Icon type="appii" />
        </Link>
      </header>
    )
  }

  render() {
    const { user, isLoggedIn } = this.props

    if (user && isLoggedIn) {
      return this.renderLoggedIn()
    }

    return this.renderLoggedOut()
  }
}

Header.defaultProps = {
  toggleEditMode: () => {},
  undoChanges: () => {},
  saveChanges: () => {}
}

Header.propTypes = {
  user: PropTypes.object,
  organisations: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  editLabel: PropTypes.string,
  editMode: PropTypes.bool,
  canEdit: PropTypes.bool,
  loading: PropTypes.bool,
  toggleEditMode: PropTypes.func,
  token: PropTypes.string,
  undoChanges: PropTypes.func,
  saveChanges: PropTypes.func,
  isMobileNavActive: PropTypes.bool,
  setMobileNavActive: PropTypes.func,
  responsive: PropTypes.bool.isRequired,
  hasNotification: PropTypes.bool.isRequired
}

export default Header
