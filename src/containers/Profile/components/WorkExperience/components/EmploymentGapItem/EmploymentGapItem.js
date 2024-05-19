import React from 'react'
import PropTypes from 'prop-types'
import EmploymentGapView from '../EmploymentGapView'
import EmploymentGapEdit from '../EmploymentGapEdit'

class EmploymentGapItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDesc: false
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
    const { deleteWork } = this.props
    return (
      <div>
        <EmploymentGapView
          {...this.props}
          toggleEdit={this.toggleEdit}
        />
        {
          edit &&
          <EmploymentGapEdit
            {...this.props}
            toggleEdit={this.toggleEdit}
            edit={true}
            deleteWork={deleteWork}
          />
        }
      </div>
    )
  }
}

EmploymentGapItem.propTypes = {
  toggleBlockEditing: PropTypes.func.isRequired,
  deleteWork: PropTypes.func.isRequired,
  saveEntity: PropTypes.func.isRequired,
  editMode: PropTypes.bool
}

export default EmploymentGapItem
