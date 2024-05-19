import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import WorkpassAdminPersona from './workpassAdminPersona.js'
import config from 'store'

describe('<WorkpassAdminPersona />', () => {
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
            fetchChecksModal: jest.fn(),
            fetchClientOrganisations: jest.fn(),
            fetchOrganisations: jest.fn(),
            fetchOrganisationsModal: jest.fn(),
            fetchUserChecks: jest.fn(),
            fetchUserPersona: jest.fn(),
        }



        it('renders correctly', () => {
            const tree = renderer.create(
                <Provider store={config.store}>
                    <Router>
                        <WorkpassAdminPersona {...commonProps} />
                    </Router>
                </Provider>
            ).toJSON()

            expect(tree).toMatchSnapshot()
        })
    })
})