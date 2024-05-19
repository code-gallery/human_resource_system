import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkpassAdminPersonaHeader from './workpassPersonaHeader.js'
import config from 'store'

describe('<WorkpassAdminPersonaHeader />', () => {
    describe('Rendering', () => {
        const commonProps = {
            match: {
                params: {
                    orgId: '1',
                    candidateId: '10',
                    requestId: '25'
                }
            },
            checksModal: [],
            client_org: [],
            fetchClientOrganisations: jest.fn(),
            deleteChecks: jest.fn(),
            deleteCompany: jest.fn(),
            deletePersona: jest.fn(),
            fetchClientOrganisations: jest.fn(),
            fetchOrganisations: jest.fn(),
            fetchUserChecks: jest.fn(),
            fetchUserPersona: jest.fn(),
            data : "",
            data2 : "",
            data3 : "",
            orgId : 1,
            fetch_organisation_id : 2,
            fetch_persona_id : 3,
            organisations : [],
            organisationsModal : []
        }



        it('renders correctly', () => {
            const tree = renderer.create(
                <Provider store={config.store}>
                    <Router>
                        <WorkpassAdminPersonaHeader {...commonProps} />
                    </Router>
                </Provider>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})