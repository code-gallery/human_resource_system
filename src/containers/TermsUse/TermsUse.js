import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from 'containers/Layout'
import PageTitle from 'components/PageTitle'
import ContentCard from 'components/ContentCard'

class TermsUse extends Component {
  renderContent() {
    return (
      <div className="container">
        <PageTitle title="Terms of Use" type="type2" />
        <ContentCard className="static-page">
          <h3 className="content-title">1. Acceptance of Terms</h3>

          <p>Your access to and use of APPII (&ldquo;the Website&rdquo;) is subject exclusively to these Terms and Conditions. You will not use the Website for any purpose that is unlawful or prohibited by these Terms and Conditions. By using the Website you are fully accepting the terms, conditions and disclaimers contained in this notice. If you do not accept these Terms and Conditions you must immediately stop using the Website.</p>

          <h3 className="content-title">2. Advice</h3>

          <p>The contents of the Website do not constitute advice and should not be relied upon in making or refraining from making, any decision.</p>

          <h3 className="content-title">3. Changes to Website</h3>

          <p>APPII reserves the right to:</p>

          <p><strong>3.1</strong> change or remove (temporarily or permanently) the Website or any part of it without notice and you confirm that APPII shall not be liable to you for any such change or removal; and</p>

          <p><strong>3.2</strong> change these Terms and Conditions at any time, and your continued use of the Website following any changes shall be deemed to be your acceptance of such change.</p>

          <h3 className="content-title">4. Links to Third Party Websites</h3>

          <p>The Website may include links to third party websites that are controlled and maintained by others. Any link to other websites is not an endorsement of such websites and you acknowledge and agree that we are not responsible for the content or availability of any such sites.</p>

          <h3 className="content-title">5. Copyright</h3>

          <p><strong>5.1</strong> All copyright, trademarks and all other intellectual property rights in the Website and its content (including without limitation the Website design, text, graphics and all software and source codes connected with the Website) are owned by or licensed to APPII or otherwise used by APPII as permitted by law.</p>

          <p><strong>5.2</strong> In accessing the Website you agree that none of the articles or Website text may be downloaded, copied, reproduced, transmitted, stored, sold or distributed without the prior written consent of the copyright holder.</p>

          <h3 className="content-title">6. Privacy Policy</h3>

          <p>We take data protection seriously and we have recently updated our Privacy Policy and Terms of Service to support changes in European data law; GDPR. Here is the link to our new Privacy Policy: https://appii.io/privacy-policy</p>

          <h3 className="content-title">7. Account Creation</h3>

          <p>On registering on the site, you may be subscribed to our newsletter system where we will update you with available jobs, our own newsletters and sometimes emails from third parties. All of these subscriptions can be cancelled either via the website, via specific removal links in the newsletters / job alerts or by emailing us via addresses contained in the newsletters.</p>

          <h3 className="content-title">8. Disclaimers and Limitation of Liability</h3>

          <p><strong>8.1</strong> The Website is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without any representation or endorsement made and without warranty of any kind whether express or implied, including but not limited to the implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.</p>

          <p><strong>8.2</strong> To the extent permitted by law, APPII will not be liable for any indirect or consequential loss or damage whatever (including without limitation loss of business, opportunity, data, profits) arising out of or in connection with the use of the Website.</p>

          <p><strong>8.3</strong> APPII makes no warranty that the functionality of the Website will be uninterrupted or error free, that defects will be corrected or that the Website or the server that makes it available are free of viruses or anything else which may be harmful or destructive.</p>

          <p><strong>8.4</strong> Nothing in these Terms and Conditions shall be construed so as to exclude or limit the liability of APPII for death or personal injury because of the negligence of APPII or that of its employees or agents.</p>

          <h3 className="content-title">9. Indemnity</h3>

          <p>You agree to indemnify and hold APPII and its employees and agents harmless from and against all liabilities, legal fees, damages, losses, costs and other expenses in relation to any claims or actions brought against APPII arising out of any breach by you of these Terms and Conditions or other liabilities arising out of your use of this Website.</p>

          <h3 className="content-title">10. Severance</h3>

          <p>If any of these Terms and Conditions should be determined to be invalid, illegal or unenforceable for any reason by any court of competent jurisdiction then such Term or Condition shall be severed, and the remaining Terms and Conditions shall survive and remain in full force and effect and continue to be binding and enforceable.</p>

          <h3 className="content-title">11. Governing Law</h3>

          <p>These Terms and Conditions shall be governed by and construed in accordance with the law of England and you hereby submit to the exclusive jurisdiction of the English courts.</p>
        </ContentCard>
      </div>
    )
  }

  render() {
    const { hasLayout } = this.props

    if (hasLayout) {
      return (
        <Layout>
          { this.renderContent() }
        </Layout>
      )
    }

    return this.renderContent()
  }
}

TermsUse.defaultProps = {
  hasLayout: true
}

TermsUse.propTypes = {
  hasLayout: PropTypes.bool
}

export default TermsUse
