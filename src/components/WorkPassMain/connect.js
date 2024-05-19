import { connect } from 'react-redux'
import WorkPassMain from './WorkPassMain'

const mapStateToProps = ({
  layout: {
    hasNotification
  }
}) => ({
  hasNotification
})

export default connect(mapStateToProps)(WorkPassMain)
