/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/serviceassignment  
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our service assignment page where contractors get assigned to service requests. 

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
AG Grid - https://www.ag-grid.com/
*/

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import {
    Container,
    Card,
    InputGroup,
    Input,
    CardFooter,
    Button,
    CardHeader,
    Pagination,
    PaginationItem,
    PaginationLink,
    Col,
    Row,
    InputGroupAddon,
} from '../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import classes from './AdminHomepage.scss';
import {
    AgGridReact,
} from '../../../components/agGrid';


/*
    CONSTS
*/
const BASE = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/"

const CONTRACTORS_BASE = BASE + "contractors/"
const SERVICES_BASE = BASE + "services/"

// const SERVICE_UPDATE_URL = "https://search-dev-hm-elasti-187p4in3vb8yt-j6t6rav5cofjfbjrznzptxwxuq.us-west-2.es.amazonaws.com/users_index/_search?q=firstName:Kevin";

const SessionByDevice = (props) => (
    <div className={classes['session']}>
        <div className={classes['session__title']}>
            {props.title}
        </div>
        <div className={classes['session__values']}>
            <div className={`${classes['session__percentage']} text-${props.color}`}>
                {props.valuePercent}%
            </div>
            <div className={`${classes['session__value']} text-${props.color}`}>
                {props.value}
            </div>
        </div>
    </div>
);

SessionByDevice.propTypes = {
    title: PropTypes.node,
    color: PropTypes.string,
    valuePercent: PropTypes.string,
    value: PropTypes.string
}

const createApiURL = (base, endpoint, data = undefined) => {
    return base + endpoint + (data ? "/" + data : "");
}

export class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contractorsColumnDefs: [
                {
                    headerName: "First Name", field: "firstName", cellRenderer: function (params) {
                        return '<a href="http://localhost:3000/dashboards/myprojects" target="_blank" rel="noopener">' + params.value + '</a>'
                    }
                },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Address 1", field: "address1" },
                { headerName: "City", field: "city" },
                { headerName: "State", field: "stateCode" },
                { headerName: "Zip Code", field: "zip" },
                { headerName: "Profile Desc", field: "profileDesc" },
                { headerName: "ID", field: "contractorID" },
            ],
            servicesColumnDefs: [
                {
                    headerName: "First Name", field: "firstName", cellRenderer: function (params) {
                        return '<a href="http://localhost:3000/dashboards/myprojects" target="_blank" rel="noopener">' + params.value + '</a>'
                    }
                },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Address1", field: "address" },
                { headerName: "City", field: "city" },
                { headerName: "State", field: "stateCode" },
                { headerName: "Zip Code", field: "zipCode" },
                { headerName: "Service Type", field: "serviceType" },
                { headerName: "Contractor ID", field: "contractorID" },
            ],
            contractorsData: [],
            servicesData: [],
            selectedService: undefined,
            selectedContractor: undefined
        };

        this.gridApi = null;

        this.onGridReady = this.onGridReady.bind(this);
        this.onModelUpdated = this.onModelUpdated.bind(this);
    }

    updateData() {
        fetch(createApiURL(CONTRACTORS_BASE, 'get', '0/null/null/null/null'))
            .then(res => res.json())
            .then(fetchedData => {
                this.setState({ contractorsData: fetchedData.contractors });
            });

        fetch(createApiURL(SERVICES_BASE, 'get', '0/compStatus/Requested/null/null'))
            .then(res => res.json())
            .then(fetchedData => {
                this.setState({ servicesData: fetchedData.services });
            });
    }

    componentDidMount() {
        this.updateData();
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

    updateResult() {
        return;
        const NEW_DATA_URL = API_URL + this.state.rows + "/" + this.state.filter + "/" + this.state.searchInput + "/null/null";

        fetch(NEW_DATA_URL)
            .then(res => res.json())
            .then(fetchedData => {
                if (fetchedData?.contractors) {
                    this.setState({ contractorsData: fetchedData.contractors });
                } else {
                    this.setState({ contractorsData: [] })
                }
            });
    }

    assignService() {
        if (!this.state.selectedContractor || !this.state.selectedService) {
            return;
        }
        const body = {
            contractorID: this.state.selectedContractor.contractorID,
            compStatus: 'Active',
        };

        fetch(createApiURL(SERVICES_BASE, 'update', this.state.selectedService.serviceID + "/" + this.state.selectedService.submittedAt), {
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData);
            }).then(window.location.replace("https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/serviceassignment/"));

        this.updateData();
    }

    render() {
        const { contractorsData, servicesData, visibleCount } = this.state;

        return (
            <Container>
                <HeaderMain
                    title="Service Assignment"
                    className="mb-5 mt-4"
                />
                <p className="pb-3">
                </p>

                <Row className="mb-5">
                    <Col lg={6}>
                        <Card>
                            <CardHeader tag="h6" className="d-flex justify-content-between align-items-center bg-white bb-0">
                                <span>Service Requests</span>
                                <div className="d-flex align-items-center">
                                    <span className="mr-3 text-nowrap small">
                                        {/* {visibleCount} / {servicesData.length} */}
                                    </span>

                                    <InputGroup>
                                        <Input placeholder="Search Projects..." />
                                        <InputGroupAddon addonType="append">
                                            <Button color="secondary" outline tag={Link} to="/apps/projects/list">
                                                <i className="fa fa-search"></i>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </CardHeader>
                            <div className="ag-theme-bootstrap" style={{ height: '600px' }}>
                                <AgGridReact
                                    columnDefs={this.state.servicesColumnDefs}
                                    rowData={servicesData}
                                    rowSelection="single"
                                    onGridReady={this.onGridReady}
                                    onModelUpdated={this.onModelUpdated}
                                    onSelectionChanged={(e) => this.setState({ selectedService: e.api.getSelectedRows()[0] })}
                                    defaultColDef={{
                                        sortable: true,
                                        resizable: true,
                                        filter: true,
                                    }}
                                >
                                </AgGridReact>
                            </div>
                            <CardFooter className="bg-white text-center">
                                {/* <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink previous href="#">Previous</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            1
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            2
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            3
                                    </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink previous href="#">Next</PaginationLink>
                                    </PaginationItem>
                                </Pagination> */}
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card>
                            <CardHeader tag="h6" className="d-flex justify-content-between align-items-center bg-white bb-0">
                                <span>Contractors</span>
                                <div className="d-flex align-items-center">
                                    <span className="mr-3 text-nowrap small">
                                        {/* {visibleCount} / {contractorsData.length} */}
                                    </span>

                                    <InputGroup size="sm">

                                        <Input placeholder="Search Contractors..." />
                                        <InputGroupAddon addonType="append">
                                            <Button color="secondary" outline tag={Link} to="/apps/projects/list">
                                                <i className="fa fa-search"></i>
                                            </Button>
                                        </InputGroupAddon>

                                    </InputGroup>
                                </div>
                            </CardHeader>
                            <div className="ag-theme-bootstrap" style={{ height: '600px' }}>
                                <AgGridReact
                                    columnDefs={this.state.contractorsColumnDefs}
                                    rowData={contractorsData}
                                    rowSelection="single"
                                    onGridReady={this.onGridReady}
                                    onModelUpdated={this.onModelUpdated}
                                    onSelectionChanged={(e) => this.setState({ selectedContractor: e.api.getSelectedRows()[0] })}
                                    defaultColDef={{
                                        sortable: true,
                                        resizable: true,
                                        filter: true,
                                    }}
                                >
                                </AgGridReact>
                            </div>
                            <CardFooter className="bg-white text-center">
                                {/* <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink previous href="#">Previous</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink previous href="#">Next</PaginationLink>
                                    </PaginationItem>
                                </Pagination> */}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

                <Row className="flex justify-content-center">
                    <Button onClick={_ => this.assignService()}>Submit</Button>
                </Row>

            </Container >
        );
    }
}
