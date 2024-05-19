import React, { Component } from 'react'
import { Table, TableData } from 'components/Table'
import Icon from 'components/Icon'
import Loader from 'components/Loader'

class WorkpassPersonaTable extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "" }
    this.getPersonaId = this.getPersonaId.bind(this);
  }
  getPersonaId = (e) => {
    this.props.callback2(e.target.id);
    this.props.getCheck(e.target.id)
    this.setState({ search: "" })
  }
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
    console.log(this.state.search)
  }

  render() {
    let filteredPersona=undefined;
    if (this.props.workPassPersonas !== undefined) {
      filteredPersona = this.props.workPassPersonas.filter(
        (persona) => {
          return persona.persona_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );
    }
    return (
      <div>
        { /** Spinning animation while we fetch for the candidates */
          this.props.pending_persona
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

                  {filteredPersona !== undefined ?
                    filteredPersona.map((persona) => {
                      return (

                        <tr className="CandidatesTable__table-row" key={persona.id}>
                          <TableData className="CandidatesTable__table-data table-label">
                            <div className="form-checkbox tableLabelText">
                              <input name="personas" type="radio" id={persona.id}
                                onChange={this.getPersonaId}
                                
                              /></div>
                            <div className="tableLabelText"><label>{persona.persona_name}</label></div>
                          </TableData>
                        </tr>
                      )
                    }) : null
                  }

                </tbody>
              </Table>
            )
        }
      </div>

    )
  }
}

export default WorkpassPersonaTable