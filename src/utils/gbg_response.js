export default function gbgResponse(data, biometric_data, type) {
  let gbg_response = ''
  if (data.length > 0 && data[0].gbg_response !== null && data[0].gbg_response !== '') {
    const response_data = JSON.parse(data[0].gbg_response)
    if (type === 'Bank Details') {
      if (typeof response_data.Bank_Accounts_GBG_response !== 'undefined') {
        gbg_response = response_data.Bank_Accounts_GBG_response.outcome.overall
      }
    }
    if (type === 'Sanctions & PEPs') {
      if (typeof response_data.GBG_response !== 'undefined') {
        const response = JSON.parse(JSON.stringify(response_data))
        gbg_response = response.GBG_response.AuthenticateSPResult.BandText._text
      }
      gbg_response = gbg_response === 'No Match' ? 'clear' : 'match'
    }
    if (type === 'CIFAS Checks') {
      if (typeof response_data.Cifas_check_response !== 'undefined') {
        gbg_response = response_data.Cifas_check_response.cifas_check_response.decision.current
      }
    }
    if (type === 'Adverse Finance Check') {
      if (response_data.checks) {
        gbg_response = response_data.checks[1].outcome.overall
      }
      if (response_data.hasOwnProperty("GBG_response")) {
        gbg_response = response_data.GBG_response
      }
      if (response_data.hasOwnProperty('statuscode') && response_data.statuscode === 200) {
        gbg_response = response_data.response
      }
    }
    if (type === 'Adverse Media') {
      gbg_response = 'clear'
      if (response_data.GBG_response !== 'undefined') {
        var data = response_data.GBG_response.AuthenticateSPResult.ResultCodes.GlobalItemCheckResultCodes.SanctionsMatches
        if (data.hasOwnProperty('GlobalSanctionsMatch')) {
          gbg_response = 'match'
        }
      }
    }
  }
  if (type === 'Disclosure Scotland - Basic') {
    const gbgdata = data.filter(res => res.name === 'dbs_gbg_response');
    gbg_response = ' '
    if (gbgdata.length > 0) {
      gbg_response = JSON.parse(gbgdata[0].gbg_response)
      if (gbg_response.hasOwnProperty('DBS_response')) {
        gbg_response = gbg_response.DBS_response.outcome.overall
      } else if (gbg_response.hasOwnProperty('response')) {
        gbg_response = gbg_response.response
      }
    }
  }
  if (type === 'Identity') {
    gbg_response = ''
  }
  if (biometric_data.length > 0 && type === 'Biometric Identity') {
    const status = biometric_data[0].biometrics_status;
    if (status === 'declined') {
      gbg_response = 'Rejected'
    } else if (status === 'needs_review') {
      gbg_response = 'Awaiting'
    } else if (status === 'complete') {
      gbg_response = 'Verified'
    } else {
      gbg_response = ''
    }
  }
  return gbg_response;
}
