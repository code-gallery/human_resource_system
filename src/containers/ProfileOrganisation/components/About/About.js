import React from 'react'
import PropTypes from 'prop-types'
import ContentCard from 'components/ContentCard'

const About = (props) => {
  const { about_us } = props.organisation
  const aboutHTML = (about_us) ? about_us.replace(/[\r\n][\n\n]/g, '<br />') : false

  return (
    <ContentCard title="About">
      {aboutHTML &&
        <p dangerouslySetInnerHTML={{ __html: aboutHTML }}></p>
      }
    </ContentCard>
  )
}

About.propTypes = {
  organisation: PropTypes.shape({
    about_us: PropTypes.string
  })
}

export default About
