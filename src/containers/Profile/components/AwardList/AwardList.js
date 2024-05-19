import React from 'react'
import PropTypes from 'prop-types'
import AwardItem from './components/AwardItem'
import AwardItemEdit from './components/AwardItemEdit'

class AwardList extends React.Component {
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
    const { awardList, awardTitle, editMode, reorder, deleteAward, filterEntries, user } = this.props
    const { addNew } = this.state
    return (
      <section className="profile-experience-wrapper">
        {
          editMode &&
          <div className="profile-experience-block-btns">
            <button
              className="reorder-btn"
              onClick={this.props.toggleReorder}>
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
        <p className="profile-block-title">{awardTitle}</p>
        {!reorder &&
          <div>
            {
              (editMode && addNew) &&
              <AwardItemEdit
                toggleEdit={this.toggleAddNewItem}
                awards={[]}
                qualifications={[]}
                awardType={this.props.awardType}
                saveAward={this.props.saveAward}
                user={user}
              />
            }
            {
              (awardList && awardList
                .filter(x => filterEntries(x))
                .sort((a, b) => {
                  if (a.hasOwnProperty('proficiency')) {
                    return parseInt(b.proficiency, 10) - parseInt(a.proficiency, 10)
                  } else if (a.date_to) {
                    return new Date(b.date_to) - new Date(a.date_to)
                  } else {
                    return new Date(b.date) - new Date(a.date)
                  }
                })
                .map((item, idx) => (
                  <AwardItem
                    {...item}
                    editMode={editMode}
                    toggleBlockEditing={this.toggleBlockEditing}
                    key={idx}
                    awards={[]}
                    qualifications={[]}
                    awardType={this.props.awardType}
                    deleteAward={deleteAward}
                    saveAward={this.props.saveAward}
                    user={user}
                  />
                )))
            }
          </div>
        }
      </section>
    )
  }
}

AwardList.propTypes = {
  awardList: PropTypes.array,
  awardTitle: PropTypes.string,
  editMode: PropTypes.bool,
  reorder: PropTypes.bool,
  awardType: PropTypes.string,
  toggleReorder: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  saveAward: PropTypes.func.isRequired,
  filterEntries: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default AwardList
