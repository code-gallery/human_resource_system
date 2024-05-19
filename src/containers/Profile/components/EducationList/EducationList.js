import React from 'react'
import PropTypes from 'prop-types'
import EducationItem from './components/EducationItem'
import EducationItemEdit from './components/EducationItemEdit'

class EducationList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blockIsEditing: false,
      addNew: false,
      reorder: false
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
    const { education, editMode, reorder, awards,
      qualifications, toggleReorder, deleteEducation,
      saveEntity, filterEntries, highSchoolDegrees, user
    } = this.props
    const { addNew } = this.state

    return (
      <section className="profile-experience-wrapper">
        {
          editMode &&
          <div className="profile-experience-block-btns">
            <button
              className="reorder-btn"
              onClick={toggleReorder}>
              &nbsp;
            </button>
            <button
              className="add-btn"
              onClick={this.toggleAddNewItem}
            >
              &nbsp;
            </button>
          </div>
        }
        <p className="profile-block-title">Education</p>
        {!reorder &&
          <div>
            {
              editMode && addNew &&
              <EducationItemEdit
                toggleEdit={this.toggleAddNewItem}
                awards={awards}
                qualifications={qualifications}
                highSchoolDegrees={highSchoolDegrees}
                deleteEducation={deleteEducation}
                saveEntity={saveEntity}
                user={user}
              />
            }
            {
              education
                .filter(x => filterEntries(x))
                .map((item, idx) => (
                  <EducationItem
                    {...item}
                    editMode={editMode}
                    toggleBlockEditing={this.toggleBlockEditing}
                    key={idx}
                    awards={awards}
                    qualifications={qualifications}
                    highSchoolDegrees={highSchoolDegrees}
                    deleteEducation={deleteEducation}
                    saveEntity={saveEntity}
                    user={user}
                  />
                ))
            }
          </div>
        }
      </section>
    )
  }
}

EducationList.propTypes = {
  education: PropTypes.array,
  editMode: PropTypes.bool,
  reorder: PropTypes.bool,
  awards: PropTypes.array,
  qualifications: PropTypes.array,
  toggleReorder: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  filterEntries: PropTypes.func,
  user: PropTypes.object,
  highSchoolDegrees: PropTypes.array
}

export default EducationList
