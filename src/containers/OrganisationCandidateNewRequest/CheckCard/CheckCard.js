import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import OutlineButton from 'components/OutlineButton'
import CheckboxOption from 'components/CheckboxOption'
import LabeledSelectInput from 'components/LabeledSelectInput'
import prettyPrice from 'utils/prettyPrice'
import LabeledTextInput from 'components/LabeledTextInput'
import './style.css'


/**
 @NOTE: Currently this presentational component is being used to create both
 simple request check cards and ones with options (i.e Enchanced DBS checks).
 */
function checkvalue(onPersonaChange){
  onPersonaChange()

}
const CheckCard = ({
  requestName,
  verifier,
  price,
  added,
  options,
  selects,
  onChange,
  className,
  personaid,
  onPersonaChange
}) => (
  <article className={`CheckCard ${className}`}>
    <div  className="CheckCard__basics">
      <div className= "CheckCard__width">
        <h1 className="CheckCard__header">{requestName}</h1>
        <p className="CheckCard__sub-heading">Verified by {verifier}</p>
      </div>





     { console.log("personaid",personaid)}

      <div className="CheckCard__right-area">

      { options && options.length > 0 && (requestName ==='Biometric Identity Checks' || requestName.includes("DBS") ||requestName.includes("Scotland") ) &&
      <div className="CheckCard__options1">
        {options.map((option, idx) => {
          const isLast = idx === options.length - 1
          const style = classNames(
            'CheckCard__opt',
            { 'is-last': isLast }
          )
          {console.log("option", option)}
        {if(option.text == 'userPays') {
          var textname = 'User Pays'
          return (
            <CheckboxOption
              className={style}
              key={idx}
              text={textname}
              checked={option.checked}
              onChange={option.onValueChange}
            />
          ) }}
        }) }
      </div>
    }

        <span className="CheckCard__price">{prettyPrice(price)}</span>
        {!personaid || personaid==='No Persona' ?<div className="CheckCard__btn" >
         {

            added
              ? <OutlineButton color="red" onClick={onChange}>REMOVE</OutlineButton>
              : <OutlineButton color="blue" onClick={onChange}>ADD</OutlineButton>
          }


        </div>: checkvalue(onPersonaChange)}
      </div>
    </div>

    { selects   && selects.length > 0 && requestName !== 'Company & VAT Checks' &&
      <div className="CheckCard__selects">
        {selects.map((select) => (
          <LabeledSelectInput
            className={'CheckCard__select'}
            key={select.label}
            label={select.label}
            onValueChange={select.onValueChange}
            options={select.options}
            value={select.value}
          />
        ))}
      </div>
    }




      { options && options.length > 0 && requestName ==='Standard DBS Check' &&
      <div className="CheckCard__options1">
        {options.map((option, idx) => {
          const isLast = idx === options.length - 1
          const style = classNames(
            'CheckCard__opt',
            { 'is-last': isLast }
          )
          {if(option.text != 'userPays') {
          return (
            <CheckboxOption
              className={style}
              key={idx}
              text={option.text}
              checked={option.checked}
              onChange={option.onValueChange}
            />
          )}}
        }) }
      </div>
    }





    { options && options.length > 0 && requestName !=='Standard DBS Check'  &&
      <div  className={`box ${requestName==='Enhanced DBS Check' ? "CheckCard__options1" : "CheckCard__options"}`}>
        {options.map((option, idx) => {
          const isLast = idx === options.length - 1
          //console.log("option and idx" , option , idx)
          //console.log("this.state " , this.state)

          const style = classNames(
            'CheckCard__opt',
            'CheckCard__options_dbs',
            { 'is-last': isLast }
          )
          {if(option.text != 'userPays') {
          return (
            <CheckboxOption
              className={style}
              key={idx}
              text={option.text}
              checked={option.checked}
              onChange={option.onValueChange}

            />

           )}}
        }) }

      </div>
    }

{ selects   && selects.length > 0 && requestName === 'Company & VAT Checks' &&
      <div className="LabeledText__div" >
        {selects.map((select) => (
        <div className='LabeledText__option'><LabeledTextInput
        className="CandidateNewRequests__input"
        label={select.label}
        labelCurr={select.labelCurr}
        //placeholder={select.value}
        fontBold = {true}
        onValueChange={select.onValueChange}
        //onValueChange={val =>  this.setState({ role: val }, () => {this.getChecks1()})}
       // key = {this.state.resetRole}
      /></div>
        ))}
      </div>
    }



  </article>
)

CheckCard.propTypes = {
  requestName: PropTypes.string.isRequired,
  verifier: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  added: PropTypes.bool.isRequired,
  options: PropTypes.array,
  selects: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
}

CheckCard.defaultProps = {
  className: '',
  options: null,
  selects: null
}

export default CheckCard
