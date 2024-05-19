import React from 'react'
import PropTypes from 'prop-types'
import EducationItemView from '../EducationItemView'
import EducationItemEdit from '../EducationItemEdit'

class EducationItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.edit && this.props.editMode && !nextProps.editMode) {
      this.toggleEdit()
    }
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
    this.props.toggleBlockEditing()
  }

  render() {
    const { edit } = this.state
    const { deleteEducation } = this.props
    return (
      <div>
        <EducationItemView
          {...this.props}
          toggleEdit={this.toggleEdit}
        />
        {
          edit &&
          <EducationItemEdit
            {...this.props}
            toggleEdit={this.toggleEdit}
            edit={true}
            deleteEducation={deleteEducation}
          />
        }
      </div>
    )
  }
}

EducationItem.propTypes = {
  toggleBlockEditing: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  editMode: PropTypes.bool
}

export default EducationItem
