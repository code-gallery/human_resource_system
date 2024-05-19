import React from 'react'
import renderer from 'react-test-renderer'
import UserData from './UserData'

describe('<UserData />', () => {
  const commonProps = {
    type: 'dbs',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'documents',
        name: 'passport',
        snapshot: [
          {
            url: 'http://example.com/img.jpg'
          }
        ]
      },
      {
        id: 2,
        type: 'attribute',
        name: 'passports',
        snapshot: [
          {
            country: 'GB'
          }
        ]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})


describe('<UserData />', () => {
  const commonProps = {
    type: 'gpdr_declaration',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'gpdr_declaration_fcc',
        snapshot: [
          {
            'All of the below': 'false',
            'By Email': 'true',
            'By SMS': 'false',
            'Phone': 'true',
            'Post': 'false'
          }
        ]
      },
      {
        id: 2,
        type: 'attribute',
        name: 'gpdr_declaration_spd',
        snapshot: [
          {
            'Any other relevant health related-data': 'false',
            'Data relating to DBS check results or criminal convictions': 'true',
            'Data relating to equal opportunities': 'false',
            'Medical history as requested': 'true'
          }
        ]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'sanction_peps',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'sanction_peps',
        snapshot: [
          {
            'dob': '2007-06-09',
            'email': '',
            'forename': 'Forename',
            'gender': 'Female',
            'heading': 'Personal Information',
            'middle_name': '',
            'phone_number': 9988998899,
            'ssn_ni': 'ssn',
            'surname': 'Surname',
            'title': 'Miss'
          }
        ]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'work_gaps',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'work_gaps_submit_2020-01-01',
        snapshot: [
          {
            'detail': 'Details',
            'from': '25/5/2000',
            'reason': 'Reason',
            'to': '26/5/2000',
            'uploadEvidence': {document: {url:'https://d39334tbcp8oul.cloudfront.net/2020/05/04/2247ddb0e65b2aad1fcb1a00fc0fe215913c0fcb/1588596221671.jpeg'}},
            
          }
        ]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})


describe('<UserData />', () => {
  const commonProps = {
    type: 'address_history',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'documents',
        name: 'address_history',
        snapshot: {
          formArray: [{
            line1 : 'line1',
            line2 : 'line2',
            postcode : 'postcode',
            town : 'town',
            from : '2020-05-01',
            to : '2020-05-01'
          }]
        }
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'national_insurance_check',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'documents',
        name: 'national_insurance_check',
        snapshot: {
          formArray: {
            nationalInsuranceNo : '123456789',
            url : 'https://d29axdg1c6z73e.cloudfront.net/2020/06/14/284b5292f86907b99638ece43de25e79961c592c/1592143671334.jpeg',
          }
        }
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'driver_license_check',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'driver_license_check',
        snapshot: {
          number : 'MCKAY705244GS9RE',
          valid_from : '2020-06-02',
          type : 'photo',
          issue_country : 'GB',
          endorsements : [
            {doo : '2020-06-17',
            offence : 'Undefined accident offences',
            type : 'Accident Offences',
            typeCode : 'AC30',
            valid_to : '2020-06-18'}
          ]
        }
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'cifas_check',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'cifas_check',
        snapshot: [{
          account_address : "{\"id\":19,\"user_id\":951,\"line1\":\"Sector 39\",\"line2\":\"Block C\",\"town\":\"Noida\",\"county\":\"Noida\",\"postcode\":\"Postcode\",\"country\":\"US\",\"from\":\"2015-05-01\",\"to\":null,\"created_at\":\"2020-05-29 09:47:58\",\"updated_at\":\"2020-06-11 09:31:54\",\"documents\":[]}",
          dob : "2007-06-03",
          email : 'abc@gml.com',
          forename : 'forename',
          gender : 'female',
          heading : 'Personal Information',
          phone_number : '9988889988',
          ssn_ni : 'ssn',
          surname : 'surname',
          title_text : 'captain'
        }]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'education_verification',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'education_verification',
        snapshot: [
          {
            degree : 'DEGREE',
            description : 'description',
            end_date : '2013-06-22T00:00:00.000Z',
            grade : 'pass',
            id : '73',
            institution : 'NIIT',
            organisation_id : '1234',
            start_date : '2013-06-22T00:00:00.000Z',
            student_number : '899',
            studied : 'noida',
            transcript : 'https://appiiweb.s3.eu-west-1.amazonaws.com/transcripts/954_743',
            type : 'higher',
            results : [{
              qualification : 'abc',
              subject : 'sub',
              grade : 'A'
            }]
          }
        ]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'employment_reference',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'employment_reference',
        snapshot: [{
          contact_phone : '9988998899',
          datefrom : '2020-06-17',
          dateto : '2020-06-26',
          organisation_name : 'NIIT',
          position_applicant : 'SE',
          position_refree : 'Manager',
          refree_firstname : 'Firstname',
          refree_lastname : 'lastname',
          refreeemail : 'abc@gmail.com'
        }]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'adverse_finance_check',
    side: 'candidate',
    status: 'complete',
    data: [
      {
        id: 1,
        type: 'attribute',
        name: 'adverse_finance_check',
        snapshot: [{
          formattAdaddress : {"formatted_address":["1 Bridge Street","","","Portsoy, Banff","Banffshire"],"thoroughfare":"Bridge Street","building_name":"","sub_building_name":"","sub_building_number":"","building_number":"1","line_1":"1 Bridge Street","line_2":"","line_3":"","line_4":"","locality":"Portsoy","town_or_city":"Banff","county":"Banffshire","district":"Aberdeenshire","country":"Scotland"},
          adversFinanceMultiLineInputBox1 : 'adversFinanceMultiLineInputBox1',
          adversFinanceMultiLineInputBox2 : 'adversFinanceMultiLineInputBox2',
          dob : '2007-06-08',
          firstename : 'firstname',
          gender : 'female',
          middle_name : 'middlename',
          postCode : 'E6 2SG',
          surname : 'surname',
          title_text : 'Miss'
        }]
      }
    ]
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

  describe('<UserData />', () => {
    const commonProps = {
      type: 'employment_verfication',
      side: 'candidate',
      status: 'complete',
      data: [
        {
          id: 1,
          type: 'attribute',
          name: 'employment_verfication',
          snapshot: [
            {
              company : 'NIIT',
              end_date : '20/0/2020',
              industry : 'Automotive',
              location : 'Noida',
              position : 'SE',
              start_date : '20/0/2020',
              verified_status : 'only me',
              visibility : 'Registered'
            }
          ]
        }
      ]
    }
  
    describe('Rendering', () => {
      it('renders correctly', () => {
        const tree = renderer.create(
          <UserData {...commonProps} />
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('<UserData />', () => {
    const commonProps = {
      type: 'dbs',
      side: 'candidate',
      status: 'complete',
      data: [
        {
          id: 1,
          type: 'attribute',
          name: 'personal',
          snapshot: {
            birth_forename : 'Laura',
            birth_surname : 'Smith',
            birth_surname_until : '20/02/2020',
            dob : '1988-02-15',
            forename : 'Laura',
            gender : 'Female',
            middle_names : '',
            national_insurance_number : 'x234567bun',
            other_names : ['OtherName'],
            phone : '9988998899',
            surname : 'Musky',
            title : 'Miss',
            officers : ['officers'],
            account_address : 'Addresses',
           
          }
        }
      ]
    }
  
    describe('Rendering', () => {
      it('renders correctly', () => {
        const tree = renderer.create(
          <UserData {...commonProps} />
        ).toJSON()
  
        expect(tree).toMatchSnapshot()
      })
    })
  })

describe('<UserData />', () => {
  const commonProps = {
    type: 'employment_reference',
    side: 'candidate',
    status: 'pending',
    data: []
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

describe('<UserData />', () => {
  const commonProps = {
    type: 'work_gaps',
    side: 'candidate',
    status: 'complete',
    data: []
  }

  describe('Rendering', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <UserData {...commonProps} />
      ).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})

