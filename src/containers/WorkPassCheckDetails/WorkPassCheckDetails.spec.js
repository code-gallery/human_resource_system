import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkPassCheckDetails from './WorkPassCheckDetails'
import config from 'store'

describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'sanction_peps'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : [
            {gbg_response : "{\"Sanctions_and_peps_response\":{\"verificationID\":\"b3ce916e-593a-4173-8826-7cd130d13449\",\"timestamp\":\"2020-06-14T14:10:08Z\",\"verificationURL\":\"https://api.gbgplc.com/verify/history/v3/people/90b8ac92-2d5a-41e6-94cc-0c058ebb538a/verifications/b3ce916e-593a-4173-8826-7cd130d13449/response\",\"score\":0,\"decision\":{\"current\":\"No Match\",\"combined\":\"REFER\"},\"action\":\"False\"}}"}
        ],
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })


  describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'driver_license_check'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : {
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
            
            }},
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })


  describe('<WorkPassCheckDetails />', () => {
    const RealDate = Date;

    beforeEach(() => {
      global.Date = class extends RealDate {
        constructor() {
          super();
          return new RealDate("2016");
        }
      };
    })
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'gpdr_declaration'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : {
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
        resetCheckDetails : jest.fn(),
        pendingData : false,
        
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'cifas_check'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : [{
            gbg_response : "{\"Cifas_check_response\":{\"cifas_check_response\":{\"verificationID\":\"8d54b3c5-c1dd-431b-9a78-8b6d282e241a\",\"timestamp\":\"2020-03-23T17:29:45Z\",\"verificationURL\":\"https://api.gbgplc.com/verify/history/v3/people/5384a044-7cdb-4023-86c4-f0e38602e5c1/verifications/8d54b3c5-c1dd-431b-9a78-8b6d282e241a/response\",\"score\":0,\"decision\":{\"current\":\"No Match\",\"combined\":\"UNDETERMINED\"},\"action\":\"\"}}}"
        }],
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })


  describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'employment_reference'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : [{
            work_pass_id : '1',
            response_status : 'agree',
            last_comms_date : '2020-06-30T08:57:49.000Z',
            work_pass_check_type : "{\"details\":{\"datefrom\":\"2019-06-30\",\"dateto\":\"2020-06-08\",\"refree_permission\":false,\"refree_firstname\":\"Shubhangi\",\"refree_lastname\":\"Singh\",\"refreeemail\":\"Shubhangi.Singh@NIIT-Tech.com\",\"confirm_refreeemail\":\"Shubhangi.Singh@NIIT-Tech.com\",\"organisation_name\":\"Niit\",\"contact_phone\":\"9650886286\",\"position_applicant\":\"HR\",\"position_refree\":\"Developer\"}}"
        }],
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'bank_details'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : {
          dataGBG : {"GBG_response":"Not Matched"},
          dataSnapshot : {"id":28,"user_id":951,"bank_acct_country":"GB","organisation_id":null,"organisation_name":"Building","bank_code":"12-34-56","account_no":"U2FsdGVkX1/VYwbnoBXt4x9s/g7WCzVIPhRwKk0s4T8=","bank_reference_no":"Ref","account_name":"Name","account_address":"Add","iban_no":null,"created_at":"2020-06-14 14:06:56","updated_at":"2020-06-14 14:06:56","unencrypted_account_no":"1235689"}
        },
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('<WorkPassCheckDetails />', () => {
    describe('Rendering', () => {
      const commonProps = {
        match: {
          params: {
            orgId: '1',
            candidateId: '10',
            requestId: '25',
            type : 'address_history'
          }
        },
        candidate: {
          requests: []
        },
        fetchingCandidate: false,
        request: { checks: [] },
        getRequest: jest.fn(),
        fetchChecksDetails: jest.fn(),
        requestCandidate: jest.fn(),
        history: {
          push: jest.fn()
        },
        organisationBalance: { balance: 1000 },
        checksDetails : {
         formArray : [{"id":17,"user_id":951,"line1":"Sector 33","line2":"Block-C","town":"Delhi","county":"Noida","postcode":"Poastcod","country":"IN","from":"2020-05-01","to":null,"created_at":"2020-05-29 07:23:24","updated_at":"2020-06-10 13:22:33","documents":[]}],
         imageUploadedResponse : { document : {url : 'https://d29axdg1c6z73e.cloudfront.net/2020/06/14/cac780dc1864be6961baba58188d2ea68362d360/1592143785184.jpeg'}
        }},
        resetCheckDetails : jest.fn(),
        pendingData : false
      }
  
      it('renders correctly', () => {
        const tree = renderer.create(
          <Provider store={config.store}>
            <Router>
              <WorkPassCheckDetails {...commonProps} />
            </Router>
          </Provider>
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })