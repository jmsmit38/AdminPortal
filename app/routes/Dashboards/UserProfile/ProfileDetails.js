
/*
Author:    Jabrail Ahmed 
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/userprofile
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our user profiles based on the customer serach table and also allows the admin to see
that specific users projects.

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
AG Grid - https://www.ag-grid.com/
*/

import React from 'react';

import { 
    Container,
    Row,
    Col,
    CardHeader,
    CardFooter,
    Card,
    CardBody,
    TabPane,
    Nav,
    NavItem,
    UncontrolledTabs,
    InputGroup
} from '../../../components';
import { HeaderMain } from "../../components/HeaderMain";

import { Profile } from "./Profile";
import { DlRowContacts } from "../UserProfile/DlRowContacts";
import { DlRowAddress } from "../UserProfile/DlRowAddress";
import { withRouter } from 'react-router';
import {
    AgGridReact,
} from '../../../components/agGrid';

const API_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/users/get/"
const DATA_URL = API_URL + "0/null/null/null/null";




class ProfileDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            requested: 0,
            active: 0,
            completed: 0,
            columnDefs: [
                { headerName: "Service Type", field: "serviceType" },
                { headerName: "First Name", field: "firstName" },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Address", field: "address" },
                { headerName: "Zip Code", field: "zipCode" },

            ],
            rowData: [],
            visibleCount: 0,
            quickFilterValue: ''
        };

        this.gridApi = null;

        this.onGridReady = this.onGridReady.bind(this);
        this.onModelUpdated = this.onModelUpdated.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.gridApi) {
            if (this.state.quickFilterValue !== prevState.quickFilterValue) {
                this.gridApi.setQuickFilter(this.state.quickFilterValue);
            }
        }
    }

    onModelUpdated() {
        if (this.gridApi) {
            const model = this.gridApi.getModel();
            const visibleCount = model.getRowCount();

            this.setState({ visibleCount });
        }
    }

    onGridReady({ api }) {
        this.gridApi = api;
    }

    componentDidMount() {
        const userID = this.props.history.location.state?.state?.userID;
        if (userID) {
            fetch(`https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/users/getDetails/${userID}`)
                .then(res => res.json())
                .then(fetchedData => {
                    this.setState({user: fetchedData.Items[0]});
                });
            fetch(`https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/services/getByUser/${userID}`)
                .then(res => res.json())
                .then(servicesData => {
                    this.setState({rowData: servicesData.services})

                    var requested = 0;
                    var active = 0;
                    var completed = 0;

                    servicesData.services.map((c) => {
                        if (c.compStatus === 'Requested') {
                            requested += 1;
                        } else if (c.compStatus === 'Active') {
                            active += 1;
                        } else if (c.compStatus === 'Completed') {
                            completed += 1;
                        }
                    });

                    this.setState({requested: requested});
                    this.setState({active: active});
                    this.setState({completed: completed});
                });

        }
    }


    render() {
        const { user, rowData } = this.state;
    
        return (<React.Fragment>
            <Container>
                <HeaderMain 
                    title="Profile Details"
                    className="mb-5 mt-4"
                />
                { /* START Content */}
                <Row>
                    <Col lg={ 4 }>
                        <Card>
                            <CardBody>
                                <Profile user={user}/>
                                <div className="text-center pb-1">
                                    <ul className="list-inline">
                                        <li className="list-inline-item text-center">
                                            <h2 className="mb-1">{this.state.requested}</h2>
                                            <span>Requested</span>
                                        </li>
                                        <li className="list-inline-item text-center">
                                            <h2 className="mb-1">{this.state.active}</h2>
                                            <span>In Progress</span>
                                        </li>
                                        <li className="list-inline-item text-center">
                                            <h2 className="mb-1">{this.state.completed}</h2>
                                            <span>Completed</span>
                                        </li>
                                    </ul>
                                </div>                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={ 8 }>
                        <UncontrolledTabs initialActiveTabId="detailContact">
                            <UncontrolledTabs.TabContent>
                                <TabPane tabId="detailContact">
                                    <Card body>
                                        <div className="">
                                            <span className="small">Contact</span>
                                        </div>
                                        <DlRowContacts 
                                            leftSideClassName="text-lg-right"
                                            rightSideClassName="text-inverse"
                                            userData={user}
                                        />
                                        <div className="mb-1">
                                            <span className="small">Address</span>
                                        </div>
                                        <DlRowAddress 
                                            leftSideClassName="text-lg-right"
                                            rightSideClassName="text-inverse"
                                            userData={user}
                                        />
                                    </Card>
                                </TabPane>
                            </UncontrolledTabs.TabContent>
                        </UncontrolledTabs>
                    </Col>
                </Row>
                <Card className="mt-2">
                    <CardHeader tag="h6" className="d-flex justify-content-between align-items-center bg-white bb-0">
                        <span>Service Requests</span>
                        <div className="d-flex align-items-center">
                            <span className="mr-3 text-nowrap small">
                            </span>

                            <InputGroup size="sm">
                            </InputGroup>
                        </div>
                    </CardHeader>
                    <div className="ag-theme-bootstrap" style={{ height: '600px' }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={rowData}
                            rowSelection="multiple"
                            onGridReady={this.onGridReady}
                            onModelUpdated={this.onModelUpdated}
                            defaultColDef={{
                                sortable: true,
                                resizable: true,
                                filter: true,
                            }}
                        >
                        </AgGridReact>
                    </div>
                    <CardFooter className="bg-white text-center">

                    </CardFooter>
                </Card>
                { /* END Content */}
    
            </Container>
        </React.Fragment>)

    }
} 
export default withRouter(ProfileDetails);