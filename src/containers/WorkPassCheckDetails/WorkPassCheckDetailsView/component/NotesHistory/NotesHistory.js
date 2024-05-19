import React, { Component } from "react";
import { Table, TableHeading, TableData } from "components/Table";
import "../../style.css";
import moment from 'moment'

class NotesHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items:props.notesHistory,
      dataLoaded:props.pendingData
    }
  }
  // componentDidMount(){
  //   const { notesHistory,pendingData } = this.props
  //   this.setState({items:notesHistory, dataLoaded:pendingData})
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.notesHistory !== nextProps.notesHistory) {
  //     this.setState({items: nextProps.notesHistory, dataLoaded:nextProps.pendingData});
  //   }
  // }
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.notesHistory !== this.props.notesHistory && nextProps.notesHistory !== undefined) {
  //     this.setState({
  //       items : nextProps.notesHistory,
  //     })
  //   }
  // }
  renderTable() {
    const { notesHistory } = this.props
   
    return (
      <tbody>
        {notesHistory.map((item, idx) => {
        return(
        <tr key={idx}>
          <TableData
            top={true}
            className="notes-table-data"
          >
            {item.status}
          </TableData>
          <TableData
            top={true}
            className="notes-table-data"
          >
            {/* {updated_at} */}
           {moment(item.updated_at).format('DD/MM/YYYY HH:mm z')}
          </TableData>
          <TableData
            top={true}
            className="notes-table-data-note-col"
          >
            {item.notes}
          </TableData>
          <TableData
            top={true}
            className="notes-table-data"
          >
            {item.complianceOfficer.first_name} {item.complianceOfficer.last_name}
          </TableData>
        </tr>
           
        )})}
      </tbody>
    );
  }

  renderNoRequests() {
    const {notesHistory}=this.props
    return (
      <tbody>
        <tr>
          <TableData
            colSpan="4"
            className="notes-table-data"
          >
            <p className="no-data">
              {notesHistory !== undefined ? "No Notes History present."
              :
              ""
              }
            </p>
          </TableData>
        </tr>
      </tbody>
    );
  }
 

  render() {
    const {notesHistory}=this.props
    
    const table = (typeof notesHistory!=='undefined' && notesHistory.length>0) ? this.renderTable() : this.renderNoRequests()
  
    
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card-header-gray">
            <div>Check History</div>
          </div>
          <Table>
            <thead>
              <tr className="border">
                <TableHeading className="notes-table-heading">Check Status</TableHeading>
                <TableHeading className="notes-table-heading">Date:Time</TableHeading>
                <TableHeading className="notes-table-heading">Note</TableHeading>
                <TableHeading className="notes-table-heading">Officer</TableHeading>
              </tr>
            </thead>
            {table}
           
          </Table>
        </div>
      </div>
    );
  }
}

export default NotesHistory;
