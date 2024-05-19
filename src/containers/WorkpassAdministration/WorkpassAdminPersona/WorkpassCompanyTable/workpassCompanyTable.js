import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import Icon from 'components/Icon'
import Loader from 'components/Loader'

class WorkpassCompanyTable extends Component {
    constructor(props) {
        super(props);
        this.state = { search: "", checked:""}
        this.getCompanyId = this.getCompanyId.bind(this);
    }
    getCompanyId= (e) =>{
       this.props.callback(e.target.id);
       this.props.getPersona(e.target.id)
       this.setState({checked : e.target.id})
       this.setState({search : ""})
      }
    
    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    
    }
      
    render() {
   
  let filteredOrg=undefined;
  if (this.props.client_org !== undefined) {
    filteredOrg = this.props.client_org.filter(
        (company)=>{
            return company.name.toLowerCase().indexOf(this.state.search.toLowerCase())!== -1;
        }
    );
  }
  
  return (
<div>  
    
    { /** Spinning animation while we fetch for the candidates */
      this.props.pending_org
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
        
        
        {filteredOrg !== undefined ?
           filteredOrg.map((company,idx)=>{
                return(
                <tr className="CandidatesTable__table-row" key={idx}>
                    <TableData className="CandidatesTable__table-data table-label">
                        <div className="form-checkbox tableLabelText">
                         <input name="companyTable" type="radio" id={company.id}
                          onChange={this.getCompanyId} checked={this.state.checked === (company.id).toString()}
                         /></div>
                         <div className="tableLabelText"><label>{company.name}</label></div>
                    </TableData>
                </tr>
                )
            }): null
        }
    </tbody>
    </Table>
        )
    }
    </div>
        )
    }
}

export default WorkpassCompanyTable