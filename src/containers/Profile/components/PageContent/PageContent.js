import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'
import DragSortableList from 'react-drag-sortable'
import { DEFAULT_ORDER } from 'containers/constants'
import EducationList from '../EducationList'
import WorkExperience from '../WorkExperience'
import AwardList from '../AwardList'
import RightBlock from '../OverviewBlock'
import EditProfile from '../OverviewBlock/components/EditProfile'
import './style.css'

function defaultOrder(pageOrder) {
  if (Object.keys(pageOrder).length < 9) {
    return DEFAULT_ORDER
  } else {
    return pageOrder
  }
}

class PageContent extends Component {
  constructor(props) {
    super(props)
    const pageOrder = props.pageOrder ? props.pageOrder : {}
    this.state = {
      reorder: false,
      order: defaultOrder(pageOrder)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageOrder !== nextProps.pageOrder &&
      _keys(nextProps.pageOrder).length !== 0) {
      this.setState({
        order: nextProps.pageOrder
      })
    }
    if (this.props.editMode !== nextProps.editMode) {
      this.setState({
        reorder: false
      })
    }
  }

  toggleReorder = () => {
    this.setState({
      reorder: !this.state.reorder
    })
  }

  onSort = (sortedList) => {
    const _obj = {}
    sortedList.map((item) => {
      _obj[item.classes[0]] = item.rank
      return true
    })
    this.props.onChangeProfileField('profile_order', _obj)
    return true
  }

  renderComponents() {
    const { reorder, order } = this.state
    const {
      editMode, educations, jobs,gaps, reference,
      deleteWork, deleteEducation, deleteAward
    } = this.props
    const { degrees, awards, industries, highSchoolDegrees, gapsReasons } = reference
    const {
      user,
      allAwards: {
        award,
        cpd,
        language,
        certificate,
        achievement,
        project,
        skill
      }
    } = this.props
    const elements = {
      education: (<EducationList
        education={educations}
        editMode={editMode}
        awards={awards}
        highSchoolDegrees={highSchoolDegrees}
        qualifications={degrees}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteEducation={deleteEducation}
        saveEntity={this.props.saveEntity}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      jobs: (<WorkExperience
        jobs={jobs}
        editMode={editMode}
        industries={industries}
        gapsReasons={gapsReasons}
        reorder={reorder}
        deleteWork={deleteWork}
        toggleReorder={this.toggleReorder}
        saveEntity={this.props.saveEntity}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      award: (<AwardList
        awardType="award"
        awardTitle="Awards"
        awardList={award}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      cpd: (<AwardList
        awardType="cpd"
        awardTitle="Professional Development (CPD)"
        awardList={cpd}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      certificate: (<AwardList
        awardType="certificate"
        awardTitle="Certificates"
        awardList={certificate}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      achievement: (<AwardList
        awardType="achievement"
        awardTitle="Achievements"
        awardList={achievement}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      project: (<AwardList
        awardType="project"
        awardTitle="Projects"
        awardList={project}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      skill: (<AwardList
        awardType="skill"
        awardTitle="Skills"
        awardList={skill}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />),
      language: (<AwardList
        awardType="language"
        awardTitle="Languages"
        awardList={language}
        editMode={editMode}
        reorder={reorder}
        toggleReorder={this.toggleReorder}
        deleteAward={deleteAward}
        saveAward={this.props.saveAward}
        filterEntries={this.props.filterEntries}
        user={user}
      />)
    }
    const _order = Object.keys(order).sort(function (a, b) {
      return order[a] - order[b]
    })
    const list = _order.map((key) => {
      return { content: (elements[key]), classes: [ key ] }
    })

    return (
      <DragSortableList
        items={list}
        moveTransitionDuration={1}
        dropBackTransitionDuration={0.3}
        onSort={this.onSort}
        type="vertical"
        disableDrag={!(reorder && editMode)}
      />
    )
  }

  render() {
    const { onChangeProfileField, allAwards, jobs,  educations, editMode, user, activities } = this.props
    const invalidFields = []
    if (user.first_name === '') {
      invalidFields.push('first_name')
    }
    if (user.last_name === '') {
      invalidFields.push('last_name')
    }

    return (
      <div className="container PageContent">
        <div className="row">
          {editMode &&
            <div className="col-xs-12 visible-xs visible-sm">
              <EditProfile
                onChangeProfileField={onChangeProfileField}
                user={user}
                invalidFields={invalidFields}
              />
            </div>
          }
          <div className="col-xs-12 col-md-8">
            {this.renderComponents()}
          </div>
          <RightBlock
            allAwards={allAwards}
            jobs={jobs}
            educations={educations}
            editMode={editMode}
            user={user}
            onChangeProfileField={onChangeProfileField}
            activities={activities}
          />
        </div>
      </div>
    )
  }
}

PageContent.propTypes = {
  pageOrder: PropTypes.object,
  user: PropTypes.object,
  editMode: PropTypes.bool,
  allAwards: PropTypes.object,
  educations: PropTypes.array,
  activities: PropTypes.array,
  jobs: PropTypes.array,
  reference: PropTypes.shape({
    awards: PropTypes.array,
    degrees: PropTypes.array,
    industries: PropTypes.array,
    gapsReasons: PropTypes.array
  }),
  onChangeProfileField: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  deleteWork: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  saveAward: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  filterEntries: PropTypes.func.isRequired
}

export default PageContent
