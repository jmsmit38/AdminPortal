/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/customersearch  
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our customer search page, this page is a list of homeowners whose information is recieved
through the database after they use of homeowner portal to create a service and account.

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
AG Grid - https://www.ag-grid.com/
*/

import React from 'react';
import { chain, reduce } from 'lodash';
import fetch from 'node-fetch';
import {withRouter, useHistory} from 'react-router';

import {
    Button,
    Container,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Input,
    InputGroup,
    Pagination,
    PaginationItem,
    PaginationLink
} from '../../../components';
import {
    AgGridReact,
} from '../../../components/agGrid';
import {
    HeaderMain,
} from '../../components/HeaderMain';

/*
    CONSTS
*/
const API_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/users/get/"
const DATA_URL = API_URL + "0/null/null/null/null";

class CustomerSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                { headerName: "First Name", field: "firstName" },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Address", field: "address1" },
                { headerName: "City", field: "city" },
                { headerName: "State", field: "stateCode" },
                { headerName: "Zip Code", field: "zip" },
                { headerName: "Profile Desc", field: "profileDesc" }

            ],
            rowData: [],
            visibleCount: 0,
            quickFilterValue: '',
            filter: 'firstName',
            searchInput: '',
            rows: 0
        };

        this.gridApi = null;

        this.onGridReady = this.onGridReady.bind(this);
        this.onModelUpdated = this.onModelUpdated.bind(this);
      
    }

    componentDidMount() {
        fetch(DATA_URL)
            .then(res => res.json())
            .then(fetchedData => {
                this.setState({ rowData: fetchedData.users });
            });
    }

    onRowClicked(e) {
        console.log("Testing.")
        let selectedData = e.data;
        let userID = e.data.userID;
        this.props.history.push('/dashboards/userprofile', 
        {state:
            {userID: userID}
        })
        // var base = "https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/userprofile?userID=";
        // var encodedKeyWords = encodeURIComponent(user)
        // let url = new URL(base + encodedKeyWords);
        // location.assign(url);
        // return window.location.assign("https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/userprofile?userID=") + e.data.userID;
    }

    onModelUpdated() {
        if (this.gridApi) {
            const model = this.gridApi.getModel();
            const visibleCount = model.getRowCount();

            this.setState({ visibleCount });
        }
    }

    onGridReady = params => {
        console.log("Testing on ready.")
        this.gridApi = params.api;
    }

    updateResult() {
        const NEW_DATA_URL = API_URL + this.state.rows + "/" + this.state.filter + "/" + this.state.searchInput + "/null/null";

        fetch(NEW_DATA_URL)
            .then(res => res.json())
            .then(fetchedData => {
                if (fetchedData && fetchedData.users) {
                    this.setState({ rowData: fetchedData.users });
                } else {
                    this.setState({ rowData: [] })
                }
            });
    }

    render() {
        const { rowData, visibleCount } = this.state;

        return (
            <Container>
                <HeaderMain
                    title="Customer Search"
                    className="mb-5 mt-4"
                />
                <p className="pb-3">
                </p>

                <Card>
                    <CardHeader tag="h6" className="d-flex justify-content-between align-items-center bg-white bb-0">
                        <span>Customers</span>
                        <div className="d-flex align-items-center">
                            <span className="mr-3 text-nowrap small">
                                {/* {visibleCount} / {rowData.length} */}
                            </span>

                            <InputGroup size="sm">
                                <Input
                                    type="select"
                                    name="select"
                                    id="defaultSelect"
                                    onChange={(e) => {
                                        this.setState({ rows: e.target.value });
                                    }}
                                >
                                    <option value="0">All</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>x
                                </Input>
                                <Input
                                    type="select"
                                    name="select"
                                    id="defaultSelect"
                                    onChange={(e) => {
                                        this.setState({ filter: e.target.value });
                                    }}
                                >
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Phone</option>
                                    <option value="address">Address</option>
                                    <option value="city">City</option>
                                    <option value="stateCode">State</option>
                                    <option value="zipCode">Zip Code</option>x
                                </Input>

                                <Input
                                    type="text"
                                    placeholder="Type text to filter..."
                                    onChange={(e) => {
                                        this.setState({ searchInput: e.target.value });
                                    }}
                                    onKeyPress={(e) => e.key == 'Enter' && this.updateResult()}
                                />

                                <Button
                                    color="red"
                                    type="submit"
                                    onClick={() => this.updateResult()}
                                >
                                    Submit
                                </Button>

                            </InputGroup>
                        </div>
                    </CardHeader>
                    <div className="ag-theme-bootstrap" style={{ height: '600px' }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={rowData}
                            rowSelection="single"
                            onModelUpdated={this.onModelUpdated}
                            onRowClicked={(e) => this.onRowClicked(e)}
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
            </Container>
        );
    }
} 
export default withRouter(CustomerSearch);
