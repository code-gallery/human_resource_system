import React from 'react'
import Form from 'components/Abstract/Form'
import EducationPreview from '../EducationPreview'
import WorkItemPreview from '../WorkItemPreview'
import httpFetch from 'utils/httpFetch'
import { getApiUrl, ROUTE_URL } from 'containers/constants'

import moment from 'moment'

class ImportProfile extends Form {

  state = this.getInitialState()

  getInitialState() {
    const cv = this.props.cv
    const [ first_name ] = cv.name.split(' ')
    const last_name = cv.name.replace(`${first_name} `, '')

    const educations = cv.education.map(edu => {
      let [ degree, studied ] = edu.degree.split(' in ')

      // If we haven't managed to split them, the chances are the content should go in studied.
      if (degree && !studied) {
        studied = degree
        degree = ''
      }

      const [ start_date, end_date ] = edu.date.split(/\s-\s/)
      const endDate = end_date || moment(start_date).add(1, 'days')
      return {
        organisation_id: null,
        institution: edu.organisation,
        degree: degree || '',
        studied: studied || '',
        start_date: moment(start_date).format('YYYY-MM-DD'),
        end_date: endDate === 'Present' ? null : moment(endDate).format('YYYY-MM-DD'),
        results: [],
        type: 'higher'
      }
    })

    const jobs = cv.experience.map(job => {

      return {
        organisation_id: null,
        company: job.organisation,
        position: job.jobTitle || '',
        start_date: moment(job.startDate).format('YYYY-MM-DD'),
        end_date: job.endDate === 'Present' ? null : moment(job.endDate).format('YYYY-MM-DD')
      }
    })

    return {
      first_name,
      last_name,
      tagline: cv.subtext ? cv.subtext : null,
      educations,
      jobs
    }
  }

  importAll = async () => {
    const edus = this.state.educations.map(edu => {
      return this.importEduItem(edu)
    })

    const jobs = this.state.jobs.map(job => {
      return this.importJobItem(job)
    })

    const profileData = this.importProfileData({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      tagline: this.state.tagline
    })

    const toProcess = [ ...edus, ...jobs, profileData ]

    await Promise.all(toProcess)
    this.props.history.push(ROUTE_URL.profile)
  }

  importJobItem = (job) => {
    return httpFetch(getApiUrl('userJobs'), {
      method: 'POST',
      body: JSON.stringify(job)
    })
  }

  importEduItem = (edu) => {
    return httpFetch(getApiUrl('userEducations'), {
      method: 'POST',
      body: JSON.stringify(edu)
    })
  }

  importProfileData = (profileData) => {
    return httpFetch(getApiUrl('user'), {
      method: 'PUT',
      body: JSON.stringify(profileData)
    })
  }

  updateJob = (idx, key, value) => {
    const jobs = this.state.jobs.slice()
    jobs[idx][key] = value
    this.setState({ jobs })
  }

  updateEducation = (idx, key, value) => {
    const educations = this.state.educations.slice()
    educations[idx][key] = value
    this.setState({ educations })
  }

  deleteJob = idx => {
    const jobs = this.state.jobs.slice()
    jobs.splice(idx, 1)
    this.setState({ jobs })
  }

  deleteEducation = idx => {
    const educations = this.state.educations.slice()
    educations.splice(idx, 1)
    this.setState({ educations })
  }

  getEducations = () => {
    return this.state.educations.map((edu, idx) => {
      return (
        <EducationPreview
          key={idx}
          idx={idx}
          onUpdate={this.updateEducation}
          deleteItem={this.deleteEducation}
          {...edu}
        />
      )
    })
  }

  getJobs = () => {
    return this.state.jobs.map((job, idx) => {
      return (
        <WorkItemPreview
          key={idx}
          idx={idx}
          onUpdate={this.updateJob}
          deleteItem={this.deleteJob}
          {...job}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group">
          <input
            name="tagline"
            type="text"
            placeholder="Tagline"
            value={this.state.tagline}
            onChange={this.onChangeInput}
          />
        </div>
        <div className="form-group assertion-group">
          <h2 className="assertion-header">Work Experience</h2>
          <div className="container-fluid">
            {this.getJobs()}
          </div>
        </div>
        <div className="form-group assertion-group">
          <h2 className="assertion-header">Education</h2>
          <div className="container-fluid">
            {this.getEducations()}
          </div>
        </div>
        <div>
          <button
            className="btn green-btn"
            onClick={this.importAll}
          >
              Import
          </button>
          <button
            className="btn red-btn"
            onClick={this.props.reset}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default ImportProfile
