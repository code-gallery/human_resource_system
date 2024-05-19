import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassCheckDetailsView from './WorkPassCheckDetailsView'
import config from 'store'

describe('<WorkPassCheckDetailsView />', () => {
    describe('Rendering : Drivers License', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : '',
        driver_license: {
            check_data : {
                dataGBG : {
                    driver_license_check_response : {
                        driver_license_check_response : {
                            decision : {current : 'No Match'}
                        }
                    }
                },
                dataSnapshot : {
                    check_code : '123',
                    dob : '2020-06-01',
                    driverLicenceMultiLineTextBox1 : null,
                    driverlicenseShowEndorsement : null,
                    issue_country : 'GB',
                    number : 'MCKAY705244GS9RE',
                    type : 'photo',
                    valid_from : '2020-06-02',
                    endorsements : [{"type":"Accident Offences","typeCode":"AC30","offence":"Undefined accident offences","doo":"2020-06-17","valid_to":"2020-06-27"}]
                }
            }
        },
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : undefined,
        type : 'driver_license_check',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : GDPR', () => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1479427200000)
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : {
            'All of the below;': false,
            'Any other relevant health related-data': true,
            'By Email' : false,
            'By SMS': true,
            'Data relating to DBS check results or criminal convictions' : false,
            'Data relating to equal opportunities' : true,
            'Medical history as requested ': false,
            'Phone': true,
            'Post': false
        },
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : undefined,
        type : 'gpdr_declaration',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : CIFAS', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'cifas_check',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Adverse Finance', () => {
      const commonProps = {
        add_history : undefined,
        advData : {check_data : {
            dataGBG : {GBG_response: 'Not Matched'},
            dataSnapshot : [{
                account_address : "\"92 Napier Road, , , , , London, \"",
                adversFinanceMultiLineInputBox1 : "Test1",
                adversFinanceMultiLineInputBox2 : '',
                dob : "2007-06-08",
                firstename : 'name',
                gender : 'female',
                middle_name : 'middleName',
                personalDetails : '',
                postCode : 'E6 2SG',
                surname : 'surname',
                title_text : 'Miss'
            }]
        }},
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'adverse_finance_check',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Bank Details', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : {
            dataGBG : {GBG_response: 'Not Matched'},
            dataSnapshot : {
                account_address : 'address',
                account_name : "U2FsdGVkX1/VYwbnoBXt4x9s/g7WCzVIPhRwKk0s4T8=",
                bank_acct_country : 'GB',
                bank_code : "12-34-56",
                bank_reference_no : "Ref",
                iban_no : '',
                organisation_id : null,
                organisation_name : 'building',
                unencrypted_account_no : "1235689",
                user_id : 1
            }
        },
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'bank_details',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : National Insurance', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : {
          formArray : {
            url : 'http://example.com/img.jpg',
            type : 'hmrc',

          },
          nationalInsuranceNo : '1123'
        },
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'national_insurance_check',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Work Gap', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'work_gaps',
        work_gaps : {
          data : {
         check_data: [{
          detail : 'absence',
          from : "2020-06-01",
          reason : 'Leave of Absence',
          to : "2020-06-06",
          uploadEvidenc : {
            document : {
              url : 'http://example.com/img.jpg'
            }
          }
         }]
        }
        }
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Address History', () => {
      const commonProps = {
        add_history : {
          formArray : [{
            country : 'india',
            county : 'noida',
            documents : [],
            from : '2020-05-01',
            line1 : 'line1',
            line2 : 'line2',
            postcode : '1234',
            town : 'Delhi',
          }],
          imageUploadedResponse : {document : {url : 'http://example.com/img.jpg'}}
        },
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'address_history',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Sanctions & PEPs', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'sanction_peps',
        work_gaps : undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Education Verification', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'education_verification',
        work_gaps : undefined,
        education_verification : [[{
          degree : "PGCert",
          description : "",
          end_date : '20/02/2020',
          grade : 'Pass',
          institution : 'NIIT',
          organisation_id : '123',
          start_date : '20/02/2020',
          student_number : '26',
          studied : 'Noida',
          type : 'higher',
          transcript : 'http://example.com/img.jpg',
          verified_status : 'not_verified'
        }]]
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Employment Verification', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : undefined,
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'employment_verfication',
        work_gaps : undefined,
        education_verification : undefined,
        employement_verification: [{
          company : 'NIIT',
          end_date : '20/0/2020',
          industry : 'Automotive',
          location : 'Noida',
          position : 'SE',
          start_date : '20/0/2020',
          verified_status : 'only me',
          visibility : 'Registered'
        }]
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })

    describe('Rendering : Employment Reference', () => {
      const commonProps = {
        add_history : undefined,
        advData : undefined,
        bankDetails : undefined,
        candidateName : "Candidate",
        checkId : '1',
        className : "",
        data1 : undefined,
        driver_license: undefined,
        education_verification : undefined,
        employement_verification : undefined,
        employment_reference : [{
          response_status : 'refree_emailed',
          work_pass_check_type : "{\"RefrenceType\":\"employment_reference\",\"CheckId\":\"987\",\"RefreeFirstname\":\"John\",\"RefreeLastname\":\"Smith\",\"Refreeemail\":\"malay.dwivedi@niit-tech.com\",\"ContactPhone\":\"9318339494\",\"OrganisationName\":\"2 Circles Communications Northeast\",\"datefrom\":\"2018-01-01\",\"dateto\":\"2020-06-26\",\"details\":{\"datefrom\":\"2018-01-01\",\"dateto\":\"2020-06-26\",\"refree_permission\":false,\"refree_firstname\":\"John\",\"refree_lastname\":\"Smith\",\"refreeemail\":\"malay.dwivedi@niit-tech.com\",\"confirm_refreeemail\":\"malay.dwivedi@niit-tech.com\",\"contact_phone\":\"9318339494\",\"organisation_name\":\"Bank of London\",\"position_applicant\":\"Applicant QA\",\"position_refree\":\"Referee QA\"}}"
        },
        {
          response_status : 'refree_emailed',
          work_pass_check_type : "{\"RefrenceType\":\"education_reference\",\"CheckId\":\"987\",\"RefreeFirstname\":\"Edu John\",\"RefreeLastname\":\"Smith\",\"Refreeemail\":\"malay.dwivedi@niit-tech.com\",\"ContactPhone\":\"9318339494\",\"OrganisationName\":\"2 Circles Communications Northeast\",\"details\":{\"datefrom\":\"01-06-2020\",\"dateto\":\"30-06-2020\",\"refree_permission\":false,\"refree_firstname\":\"Edu John\",\"refree_lastname\":\"Smith\",\"refreeemail\":\"malay.dwivedi@niit-tech.com\",\"confirm_refreeemail\":\"malay.dwivedi@niit-tech.com\",\"organisation_name\":\"NTL\",\"contact_phone\":\"9318339494\"}}"
        },
        {
          response_status : 'agree',
          work_pass_check_type : "{\"RefrenceType\":\"personal_reference\",\"CheckId\":\"987\",\"RefreeFirstname\":\"Personal\",\"RefreeLastname\":\"Smith\",\"Refreeemail\":\"malay.dwivedi@niit-tech.com\",\"ContactPhone\":\"9318339494\",\"OrganisationName\":\"2 Circles Communications Northeast\",\"details\":{\"datefrom\":\"01-02-2020\",\"dateto\":\"29-02-2020\",\"refree_permission\":false,\"refree_firstname\":\"Personal\",\"refree_lastname\":\"Smith\",\"refreeemail\":\"malay.dwivedi@niit-tech.com\",\"confirm_refreeemail\":\"malay.dwivedi@niit-tech.com\",\"refree_address\":{\"line1\":\"123 Lake Dr\",\"line2\":\"\",\"town\":\"London\",\"county\":\"Oxford\",\"country\":\"GB\",\"postcode\":\"W3D 1X4\",\"from\":\"2020-04-01\",\"to\":null},\"contact_phone\":\"9318339494\"}}"
        },
        {
          response_status : 'disagree',
          work_pass_check_type : "{\"RefrenceType\":\"employment_agency_reference\",\"CheckId\":\"987\",\"RefreeFirstname\":\"EmpA John\",\"RefreeLastname\":\"Smith\",\"Refreeemail\":\"malay.dwivedi@niit-tech.com\",\"ContactPhone\":\"9318339494\",\"OrganisationName\":\"2 Circles Communications Northeast\",\"details\":{\"datefrom\":\"30-11-2018\",\"dateto\":\"30-06-2020\",\"refree_permission\":false,\"refree_firstname\":\"EmpA John\",\"refree_lastname\":\"Smith\",\"refreeemail\":\"malay.dwivedi@niit-tech.com\",\"confirm_refreeemail\":\"malay.dwivedi@niit-tech.com\",\"organisation_name\":\"NIIT\",\"contact_phone\":\"9318339494\",\"position_applicant\":\"AQA\",\"position_refree\":\"RQA\"}}"
        },
        {
          response_status : 'disagree',
          work_pass_check_type : "{\"RefrenceType\":\"unemployment_reference\",\"CheckId\":\"987\",\"RefreeFirstname\":\"Unemp Peter\",\"RefreeLastname\":\"Smith\",\"Refreeemail\":\"malay.dwivedi@niit-tech.com\",\"OrganisationName\":\"2 Circles Communications Northeast\",\"details\":{\"datefrom\":\"01-06-2020\",\"dateto\":\"14-06-2020\",\"refree_permission\":false,\"refree_firstname\":\"Unemp Peter\",\"refree_lastname\":\"Smith\",\"refreeemail\":\"malay.dwivedi@niit-tech.com\",\"confirm_refreeemail\":\"malay.dwivedi@niit-tech.com\",\"jobcentre_letter\":\"\"}}"
        },
      ],
        modalIsOpen : false,
        national_insurance : undefined,
        openModal : jest.fn(),
        pendingData : false,
        status : undefined,
        statuscifas : 'No Match',
        type : 'employment_reference',
        work_gaps : undefined,
        education_verification : undefined,
        employement_verification: undefined
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetailsView {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })


  })