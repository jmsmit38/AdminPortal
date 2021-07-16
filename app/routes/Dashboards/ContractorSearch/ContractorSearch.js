import React from 'react';
import { chain, reduce } from 'lodash';
import fetch from 'node-fetch';

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
    AgGridColumn,
} from '../../../components/agGrid';
import {
    HeaderMain,
} from '../../components/HeaderMain';
import colors from '../../../colors';

/*
    CONSTS
*/
const DATA_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/contractors/get/0/null/null/null/null";
const API_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/contractors/get/"
// const DATA_URL = API_URL + "0/null/null/null/null";



export default class AgGridExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [

                {
                    headerName: "First Name", field: "firstName"
                },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Email", field: "email" },
                { headerName: "Phone", field: "phone" },
                { headerName: "Address 1", field: "address1" },
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
                this.setState({ rowData: fetchedData.contractors });
            });
    }

    onRowClicked() {
        console.log("Testing.")
        //adding comment
        return window.location.replace("https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/myprojects")
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
        const NEW_DATA_URL = API_URL + this.state.rows + "/" + this.state.filter + "/" + this.state.searchInput + "/null/null";

        fetch(NEW_DATA_URL)
            .then(res => res.json())
            .then(fetchedData => {
                if (fetchedData && fetchedData.contractors) {
                    this.setState({ rowData: fetchedData.contractors });
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
                    title="Contractor Search"
                    className="mb-5 mt-4"
                />
                <p className="pb-3">
                </p>

                <Card>
                    <CardHeader tag="h6" className="d-flex justify-content-between align-items-center bg-white bb-0">
                        <span>Contractor</span>
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
                            rowData={rowData}
                            rowSelection="multiple"
                            onGridReady={this.onGridReady}
                            onModelUpdated={this.onModelUpdated}
                            onRowClicked={this.onRowClicked}
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

