import React from 'react'
import PropTypes from 'prop-types'
import { Document, Page } from 'react-pdf'
import './style.css'

export default class MyPdfViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: null
    }
  }

  onDocumentComplete = () => {
    this.setState({ page: 1 })
  }

  render() {
    const { transcript } = this.props
    return (
      <div>
        <Document
          file={transcript}
          onLoadSuccess={this.onDocumentComplete}
          className="custom-document-view"
        >
          <Page pageNumber={this.state.page} />
        </Document>
      </div>
    )
  }
}

MyPdfViewer.propTypes = {
  transcript: PropTypes.string
}
