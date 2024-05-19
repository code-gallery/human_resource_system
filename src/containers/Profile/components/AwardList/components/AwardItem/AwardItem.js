import React from 'react'
import PropTypes from 'prop-types'
import AwardItemView from '../AwardItemView'
import AwardItemEdit from '../AwardItemEdit'

class AwardItem extends React.Component {
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
    const { deleteAward } = this.props
    return (
      <div>
        <AwardItemView
          {...this.props}
          toggleEdit={this.toggleEdit}
        />
        {
          edit &&
          <AwardItemEdit
            {...this.props}
            toggleEdit={this.toggleEdit}
            deleteAward={deleteAward}
            edit={true}
          />
        }
      </div>
    )
  }
}

AwardItem.propTypes = {
  editMode: PropTypes.bool,
  toggleBlockEditing: PropTypes.func.isRequired,
  deleteAward: PropTypes.func.isRequired,
  saveAward: PropTypes.func.isRequired
}

export default AwardItem
