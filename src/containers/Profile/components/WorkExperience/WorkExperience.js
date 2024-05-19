import React from 'react'
import PropTypes from 'prop-types'
import WorkExperienceItem from './components/WorkExperienceItem'
import WorkItemEdit from './components/WorkItemEdit'
import EmploymentGapItem from './components/EmploymentGapItem'


class WorkExperience extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blockIsEditing: false,
      addNew: false
    }
  }

  toggleBlockEditing = () => {
    this.setState({
      blockIsEditing: !this.state.blockIsEditing
    })
  }

  toggleAddNewItem = () => {
    this.setState({
      addNew: !this.state.addNew
    })
  }

  render() {
    const { editMode, jobs, reorder, industries, gapsReasons, deleteWork, saveEntity, filterEntries, user } = this.props
    const { addNew } = this.state
    return (
      <section className="profile-experience-wrapper">
        {
          editMode &&
          <div className="profile-experience-block-btns">
            <button
              className="reorder-btn"
              onClick={this.props.toggleReorder}>&nbsp;</button>
            <button
              className="add-btn"
              onClick={this.toggleAddNewItem}
            >&nbsp;</button>
          </div>
        }
        <p className="profile-block-title">Work Experience</p>
        {!reorder &&
          <div>
            {editMode && addNew &&
              <WorkItemEdit
                toggleEdit={this.toggleAddNewItem}
                industries={industries}
                deleteWork={deleteWork}
                saveEntity={saveEntity}
                user={user}
              />
            }
            
            {
              jobs
                .filter(x => filterEntries(x))
                .map((item, idx) => {
                  if(item.company==='Employment Gap')
                      return  <EmploymentGapItem
                      {...item}
                      key={idx}
                      editMode={editMode}
                      toggleBlockEditing={this.toggleBlockEditing}
                      industries={industries}
                      gapsReasons={gapsReasons}
                      deleteWork={deleteWork}
                      saveEntity={saveEntity}
                      visibility='private'
                      user={user}
                    />
                  return <WorkExperienceItem
                  {...item}
                  editMode={editMode}
                  key={idx}
                  toggleBlockEditing={this.toggleBlockEditing}
                  industries={industries}
                  deleteWork={deleteWork}
                  saveEntity={saveEntity}
                  user={user}
                />
              })
            }
           
              
          </div>
        }
      </section>
    )
  }
}

WorkExperience.propTypes = {
  editMode: PropTypes.bool,
  deleteWork: PropTypes.func.isRequired,
  jobs: PropTypes.array,
  gaps: PropTypes.array,
  reorder: PropTypes.bool,
  toggleReorder: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  industries: PropTypes.array,
  saveEntity: PropTypes.func.isRequired,
  filterEntries: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default WorkExperience
