import React from 'react'
import PropTypes from 'prop-types'
import SearchBox from 'components/SearchBox'
import Loader from 'components/Loader'
import ExternalCandidatesTable from 'components/ExternalCandidatesTable'
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
}) => (
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
          <ExternalCandidatesTable
            title={title}
            candidates={candidates}
            organisationId={organisationId}
            onSelectCandidates={onSearch}
          />
        )
    }
  </WorkPassMain>
)

Candidates.defaultProps = {
  title: 'External Candidates'
}

export default Candidates