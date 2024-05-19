import React, {useState} from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/SearchBox'
import Loader from 'components/Loader'
import CandidatesTable from 'components/CandidatesTable'
import WorkPassMain from 'components/WorkPassMain'
import './style.css'

const Candidates = ({
  loading,
  candidates,
  onSearch,
  title,
  organisationId,
  searchCandidate,
  closePath
}) => {
  return (
    <WorkPassMain>
       <div className="Candidates__search-wrap">
              <SearchBox
                className="Candidates__search cand_search"
                setSearchObj={true}
                onSearch={onSearch}
                placeholder="Search by name, email or request ID"
                searchCandidate={searchCandidate}
                loading={loading}
                organisationId={organisationId}
                closePath={closePath}
              />
            </div>
  
      { /** Spinning animation while we fetch for the candidates */
        loading
          ? (
            <div className="Candidates__loader">
              <Loader size={65} color="#72d371" />
            </div>
          )
          : (
            <CandidatesTable
              title={title}
              candidates={candidates}
              organisationId={organisationId}
              onSelectCandidates={onSearch}
            />
          )
      }
    </WorkPassMain>
  )
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    requests: PropTypes.array.isRequired,
    userId: PropTypes.number,
    profileImage: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })),
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
  organisationId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

Candidates.defaultProps = {
  title: 'Candidates'
}

export default Candidates
