import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import classNames from 'classnames'
import { ROUTE_URL } from 'containers/constants'
import './style.css'

const WorkPassCandidateSideMenu = (props) => {
  const { hasNotification, userId } = props
  const rootStyle = classNames('SideMenu', { hasNotification })
  const workpasschecks = ROUTE_URL.workPassCandidateChecks.replace(':userId', userId)
  return (
    <aside className={rootStyle}>
      <ul className="SideMenu__link-list-wrap margin_top">
        <li>
          <NavLink
            className="SideMenu__link is-active"
            activeClassName="is-active"
            exact
            to={workpasschecks}>
            Work Pass Checks
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className="SideMenu__link"
            activeClassName="is-active"
            to={"#"}>
            Organisations
          </NavLink>
        </li>*/ }
      </ul>
    </aside>
  );
}

WorkPassCandidateSideMenu.propTypes = {
  hasNotification: PropTypes.bool,
  userId: PropTypes.number.isRequired
};

export default WorkPassCandidateSideMenu;
