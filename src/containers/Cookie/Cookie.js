import React from 'react'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'

const Cookie = () => {
  window.scrollTo(0, 0)
  return (
    <Layout>
      <div className="container">
        <PageTitle title="Cookies" type="type2" />
        <ContentCard className="static-page">
          <h3 className="content-title">How we Use Cookies</h3>
          <p>Personally identifiable information nor can they harm your computer. We want our website to be
            informative, personal, and as user friendly as possible and cookies help us to achieve that goal.</p>
          <p>By using our website, you agree to the use of cookies and other technologies as set out in this policy.
            We appreciate some users may like more individual control over their visit to our website and can adjust
            their settings accordingly. You can read all about this in the section below &quot;How to control
            and delete cookies&quot;. If you do not agree to such use, please refrain from using the website.</p>
          <h3 className="content-title">What are Cookies</h3>
          <p>A cookie is a small file and holds a certain amount of data, which our website can send to your
            browser. It may then be stored on your computer&apos;s hard drive and can be accessed by our web server.
            This cookie data can then be retrieved and can allow us to customise our web pages and
            services accordingly. It&apos;s important to clarify that cookies do not collect any personal
            data stored on your hard drive or computer.</p>
          <p>To find out more about cookies, visit www.allaboutcookies.org </p>
          <h3 className="content-title">How Does APPII Use Cookies</h3>
          <p>Our website uses both persistent and session cookies:</p>
          <p>Persistent cookies are used to allow the website to recognise users when they return to the site and to
            remember certain information about their preferences. These cookies are cookies which stay on your
            computer permanently, until you &quot;manually&quot; delete them.</p>
          <p>Session cookies are used in order to allow customers to carry information across pages of the website,
            without having to re-enter such information. These cookies delete themselves automatically when you
            leave a website and go to another, or when you shut down your browser.</p>
          <p>We have also developed relationships with carefully selected and monitored partners, to assist in the
            delivery of a high quality website. Some of these partners may also set cookies during your visit to
            support customisation of adverts that you may see elsewhere on the Internet, and/or in order to meet
            contractual obligations with us.</p>
          <p>While these cookies do not store any personal details relating to you or your credit cards, please note
            we do not have access or control over the cookies and similar technologies that our partners use.</p>
          <h3 className="content-title">Social Media Third Party Cookies</h3>
          <p>To enrich our website content, sometimes we may embed video content from other social media websites
            such as YouTube or Facebook. As a result, when you visit a page with content embedded, you may be
            presented with cookies from these websites. APPII has no control or liability over these cookies set, so
            you should check the relevant third party&apos;s cookie policy for more information.</p>
          <h3 className="content-title">How to Control and Delete Cookies</h3>
          <p>APPII will not use cookies to collect personally identifiable information about you. However, should
            you choose to disable, reject or block our cookies, some parts of our website will not function fully,
            or in some cases, our website will not be accessible at all.</p>
          <p>For more information on how to control your cookie settings and browser settings, or how to delete
            cookies on your hard drive, please visit www.aboutcookies.org.</p>
        </ContentCard>
      </div>
    </Layout>
  )
}

export default Cookie
