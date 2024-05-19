import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const RequestsBanner = ({ requests, className }) => {
  if (!Array.isArray(requests)) {
    return null
  }
const mobileLink={
  color:'#fff',
  fontWeight:'bold'
}


  let incompleteRequests = requests
    .filter(({ status }) => status == 'pending')

    let filteredReq = []
    for (let i = 0; i < incompleteRequests.length; i++) {
      let req = incompleteRequests[i]
      let checks = req.checks
      let filteredChecks = checks.filter((item) => item.options && item.options.checkForMobile === undefined)
      if (filteredChecks.length > 0) {
        req.checks = filteredChecks
        filteredReq.push(req)
      }
    }
  
    incompleteRequests = [...filteredReq]

  if (!incompleteRequests.length) {
    return null
  }

  if (incompleteRequests.length === 1) {
    const name = incompleteRequests[0].candidate.organisation.name
    
    return (
      <React.Fragment>
      { window.innerWidth <= 768 && <aside className={`RequestsBannerMobile ${className}`}>
       <p className="RequestsBanner__msg">
        CLICK HERE TO <a href="https://appappii.page.link/mVFa" style={mobileLink}>DOWNLOAD APPII APP</a> to complete checks.
       </p>
      </aside>
     }
     { window.innerWidth > 768 && <aside className={`RequestsBanner ${className}`}>
       <p className="RequestsBanner__msg">
        You have an incomplete Work Pass Request from {name}.
        Please use the APPII mobile app to complete them.
       </p>
      </aside>
    }
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      { window.innerWidth <= 768 &&
      <aside className={`RequestsBannerMobile ${className}`}>
      <p className="RequestsBanner__msg">
        CLICK HERE TO <a href="https://appappii.page.link/mVFa" style={mobileLink}>DOWNLOAD APPII APP</a> to complete checks.
      </p>
    </aside>
    }
    {window.innerWidth > 768 &&
    <aside className={`RequestsBanner ${className}`}>
      <p className="RequestsBanner__msg">
        You have <b>{incompleteRequests.length} incomplete Work Pass Requests</b>.
        Please use the APPII mobile app to complete them.
      </p>
    </aside>
    }
   </React.Fragment>
  )
}

RequestsBanner.propTypes = {
  requests: PropTypes.array.isRequired,
  className: PropTypes.string
}

RequestsBanner.defaultProps = {
  className: ''
}

export default RequestsBanner
