import React, { Component } from 'react'
import { Table,TableData } from 'components/Table'
import Icon from 'components/Icon'
import Loader from 'components/Loader'

class WorkpassCheckTable extends Component {
  constructor(props) {
    super(props);
    this.state = {search: "",checked: '', }
    this.getChecksId = this.getChecksId.bind(this);
  }
    getChecksId= (e) =>{

        this.props.callback3(e.target.id);
        this.setState({ search: "" })
      }
      updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) })
      }
    render() {
      let filteredChecks=this.props.workPassChecks;
      if (this.props.workPassChecks !== undefined) {
        filteredChecks = this.props.workPassChecks.filter(
          (check) => {
            return check.name && check.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );
      }
        return (
        <div>
          { /** Spinning animation while we fetch for the candidates */
        this.props.pending_checks
        ? (
          <div className="Candidates__loader">
            <Loader size={65} color="#72d371" />
          </div>
        )
        : (
            <Table className="CandidatesTable__table">
           <tbody>
            <tr className="CandidatesTable__table-row">
                <TableData className="CandidatesTable__table-data">

                    <form className='SearchBox'>
                          <label>
                           <span className="SearchBox__icon">
                               <Icon type="search" color="#7F8DAA" />
                             </span>
                            <input className="SearchBox__input" type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}
                              placeholder='Search' />

                             </label>
                     </form>

                </TableData>

            </tr>


            {filteredChecks !== undefined ?
              filteredChecks.map((check)=>{
                   return(
                    <tr className="CandidatesTable__table-row" key={check.id}>
                    <TableData className="CandidatesTable__table-data table-label">
                        <div className="form-checkbox tableLabelText">
                         <input name="checks" type="radio" id={check.id}
                          onChange={this.getChecksId}
                         /></div>
                         <div className="tableLabelText"><label>{check.name == 'DBS'?'DBS Standard': check.name}</label></div>
                    </TableData>
                </tr>
                   )
               }):null
           }
           </tbody>
            </Table>
        )
        }
           </div>



        )
    }
}

export default WorkpassCheckTable
