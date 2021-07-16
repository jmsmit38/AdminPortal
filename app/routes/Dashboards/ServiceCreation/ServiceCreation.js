/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/servicecreation  
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our service creation page where representatives may create a service for homeowners. 

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
AG Grid - https://www.ag-grid.com/
*/

import React from 'react';
import _ from 'lodash';

import {
    Container,
    Wizard,
    Card,
    CardFooter,
    CardBody,
    Button,
    Row,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    CustomInput,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from '../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import fetch from 'node-fetch';
import { Redirect } from 'react-router';

const sequence = ['Pest Control', 'Contact Info', 'Project Details', 'Summary'];

const items = [
    {
        name: 'Kitchen Remodel',
    },
    {
        name: 'Bathroom Remodel',
    },
    {
        name: 'Plumbing',
    },
    {
        name: 'Pest Control',
    },
    {
        name: 'Heating & Cooling',
    },
    {
        name: 'Painting',
    },
    {
        name: 'Solar Installation',
    }
];

const WizardStep1 = (obj) => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    What Pest can we eradicate!
                </h3>
                <p>
                    Discover goods you&apos;ll love from brands that inspire.
                    The easiest way to open your own online store.
                    Discover amazing stuff or open your own store for free!
                </p>
                <small>
                    Below is a sample page for your cart,
                    Created using pages design UI Elementes
                </small>
            </div>
        </Col>
        <Col md={6}>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _.map(items, (item, index) => (
                            <tr
                                onClick={() => {
                                    var oldproject = { ...obj.state.project };
                                    oldproject.serviceType = item.name;
                                    obj.setState({ project: { ...oldproject } });
                                }}
                                key={index}>
                                <td>
                                    <i className={`fa fa-check ${obj.state.project.serviceType == item.name ? "text-success" : ""}`}></i>
                                </td>
                                <td>
                                    {item.name}
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td colSpan={3}></td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    </Row>
);
const WizardStep2 = (obj) => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    Your Information is Safe with Us!
                </h3>
                <p>
                    We respect your privacy and protect it with strong encryption, plus strict policies.
                    Two-step verification, which we encourage all our customers to use.
                </p>
                <small>
                    Fields marked as <span className="text-danger">*</span> are Required!
                </small>
            </div>
        </Col>
        <Col md={6}>
            <Form>
                <h6 className="pb-3">
                    Name and Email Address
                </h6>
                <Row className="pb-4">
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="firstName">
                                First Name <span id="firstName" className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='First Name'
                                defaultValue = "Kevin"
                                text = "Kevin"
                                value = "Kevin"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.firstName = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="lastName">
                                Last Name <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Last Name'
                                defaultValue = "Heart"
                                text = "Heart"
                                value = "Heart"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.lastName = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                //     console.log(obj.state.project);
                                // }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <FormGroup>
                            <Label for="email">
                                Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Email address'
                                defaultValue = "KHeart@gmail.com"
                                text = "KHeart@gmail.com"
                                value = "KHeart@gmail.com"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.email = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <h6 className="pb-3">
                    Billing Address
                </h6>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <Label for="address">
                                Address <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Current address'
                                defaultValue = "564 What Now Avenue"
                                text = "564 What Now Avenue"
                                value = "564 What Now Avenue"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.address = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={9}>
                        <FormGroup>
                            <Label for="state">
                                State/Province <span className="text-danger">*</span>
                            </Label>
                            <Input
                                type="select"
                                name="select"
                                id="state"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.stateCode = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                //     console.log(oldproject)
                                // }}
                            >
                                <option defaultValue="">Select a state</option>
                                <option>AL</option>
                                <option>AK</option>
                                <option>AZ</option>
                                <option>AR</option>
                                <option>CA</option>
                                <option>CO</option>
                                <option>CT</option>
                                <option>DE</option>
                                <option>FL</option>
                                <option>GA</option>
                                <option>HI</option>
                                <option>ID</option>
                                <option>IL</option>
                                <option>IN</option>
                                <option>IA</option>
                                <option>KS</option>
                                <option>KY</option>
                                <option>LA</option>
                                <option>ME</option>
                                <option>MD</option>
                                <option>MA</option>
                                <option>MI</option>
                                <option>MN</option>
                                <option>MS</option>
                                <option>MO</option>
                                <option>MT</option>
                                <option>NE</option>
                                <option>NV</option>
                                <option>NH</option>
                                <option>NJ</option>
                                <option>NM</option>
                                <option>NY</option>
                                <option>NC</option>
                                <option>ND</option>
                                <option>OH</option>
                                <option>OK</option>
                                <option>OR</option>
                                <option>PA</option>
                                <option>RI</option>
                                <option>SC</option>
                                <option>SD</option>
                                <option>TN</option>
                                <option>TX</option>
                                <option>UT</option>
                                <option>VT</option>
                                <option>VA</option>
                                <option>WA</option>
                                <option>WV</option>
                                <option>WI</option>
                                <option>WY</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={9}>
                        <FormGroup>
                            <Label for="city">
                                City <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Enter City'
                                defaultValue = "Las Vegas"
                                text = "Las Vegas"
                                value = "Las Vegas"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.city = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <FormGroup>
                            <Label for="zipCode">
                                ZIP Code <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Zip Code'
                                defaultValue = "89108"
                                text = "89108"
                                value = "89108"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.zipCode = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>

                    <Col sm={12}>
                        <FormGroup>
                            <Label for="phone">
                                Phone Number
                            </Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    placeholder='123-456-7890'
                                    defaultValue = "702-258-3691"
                                    text = "702-258-3691"
                                    value = "702-258-3691"
                                    // onChange={(e) => {
                                    //     var oldproject = { ...obj.state.project };
                                    //     oldproject.phone = e.target.value;
                                    //     obj.setState({ project: { ...oldproject } });
                                    //     console.log(obj.state.project);
                                    // }}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Col>
    </Row>
);
const WizardStep3 = (obj) => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    Provide the project details!
            </h3>
                <p>
                    We respect your privacy and protect it with strong encryption, plus strict policies.
                    Two-step verification, which we encourage all our customers to use.
            </p>
                <small>
                    Fields marked as <span className="text-danger">*</span> are Required!
            </small>
            </div>
        </Col>
        <Col md={6}>
            <Form>
                <h6 className="pb-3">
                    Name and Email Address
            </h6>
                <Row className="pb-4">
                    <Col sm={12}>
                        <FormGroup row>
                            <Label for="operatingSystem11" sm={4} className="pt-0">
                                Building Type
                                    </Label>
                            <Col sm={8}>
                                <CustomInput
                                    id="bldgresidental"
                                    type="radio"
                                    name="bldgType"
                                    label="Residential"
                                    inline
                                    onChange={(e) => {
                                        var oldproject = { ...obj.state.project };
                                        oldproject.bldgType = "Residential";
                                        obj.setState({ project: { ...oldproject } });
                                    }}
                                />
                                <CustomInput
                                    id="bldgbussiness"
                                    type="radio"
                                    name="bldgType"
                                    label="Business"
                                    inline
                                    onChange={(e) => {
                                        var oldproject = { ...obj.state.project };
                                        oldproject.bldgType = "Business";
                                        obj.setState({ project: { ...oldproject } });
                                    }}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col sm={12}>
                        <FormGroup row>
                            <Label for="operatingSystem11" sm={4} className="pt-0">
                                Emergency
                                    </Label>
                            <Col sm={8}>
                                <CustomInput
                                    id="emergencyyes"
                                    type="radio"
                                    name="emergency"
                                    label="Yes"
                                    inline
                                    onChange={(e) => {
                                        var oldproject = { ...obj.state.project };
                                        oldproject.emergency = "Yes";
                                        obj.setState({ project: { ...oldproject } });
                                    }}
                                />
                                <CustomInput
                                    id="emergencyno"
                                    type="radio"
                                    name="emergency"
                                    label="No"
                                    inline
                                    onChange={(e) => {
                                        var oldproject = { ...obj.state.project };
                                        oldproject.emergency = "No";
                                        obj.setState({ project: { ...oldproject } });
                                    }}
                                />
                            </Col>
                        </FormGroup>
                    </Col>
                    <FormGroup>
                        <Label for="operatingSystem" className="pt-0">
                            Control Type
                        </Label>
                        <div>
                            <CustomInput
                                id="ote"
                                type="radio"
                                name="control"
                                label="One Time Extermination"
                                inline
                                onChange={(e) => {
                                    var oldproject = { ...obj.state.project };
                                    oldproject.controlType = "One Time Extermination";
                                    obj.setState({ project: { ...oldproject } });
                                }}
                            />
                            <CustomInput
                                id="pe"
                                type="radio"
                                name="control"
                                label="Post Evaluation"
                                inline
                                onChange={(e) => {
                                    var oldproject = { ...obj.state.project };
                                    oldproject.controlType = "Post Evaluation";
                                    obj.setState({ project: { ...oldproject } });
                                }}
                            />
                            <CustomInput
                                id="c"
                                type="radio"
                                name="control"
                                label="Recurring Pest Control Service"
                                inline
                                onChange={(e) => {
                                    var oldproject = { ...obj.state.project };
                                    oldproject.controlType = "Recurring Pest Control Service";
                                    obj.setState({ project: { ...oldproject } });
                                }}
                            />
                            <CustomInput
                                id="f"
                                type="radio"
                                name="control"
                                label="Fumigation"
                                inline
                                onChange={(e) => {
                                    var oldproject = { ...obj.state.project };
                                    oldproject.controlType = "Fumigation";
                                    obj.setState({ project: { ...oldproject } });
                                }}
                            />

                        </div>
                    </FormGroup>
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="minSqft">
                                Min <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Min Sqft'
                                defaultValue = "1000"
                                text = "1000"
                                value = "1000"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.minSqft = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label for="maxSqft">
                                Max <span className="text-danger">*</span>
                            </Label>
                            <Input
                                placeholder='Max Sqft'
                                defaultValue = "3500"
                                text = "3500"
                                value = "3500"
                                // onChange={(e) => {
                                //     var oldproject = { ...obj.state.project };
                                //     oldproject.maxSqft = e.target.value;
                                //     obj.setState({ project: { ...oldproject } });
                                // }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="pb-4">
                    <Label for="message-2">
                        Additional Comments
                                    </Label>
                    <Input
                        type="textarea"
                        name="text"
                        placeholder="Add any additional information"
                        className="mb-2"
                        defaultValue = "Teamwork makes the dream work"
                        text = "Teamwork makes the dream work"
                        value = "Teamwork makes the dream work"
                        // onChange={(e) => {
                        //     var oldproject = { ...obj.state.project };
                        //     oldproject.comments = e.target.value;
                        //     obj.setState({ project: { ...oldproject } });
                        //     console.log(obj.state.project);
                        // }}
                    />
                </Row>
            </Form>
        </Col>
    </Row>
);
const WizardStep4 = (obj) => (
    <Row>
        <Col md={6}>
            <div>
                <h3 className="mb-4">
                    Summary
                </h3>
                <p className="mb-5">
                    Below is a sample page for your service creation
                </p>
                <Table className='my-2'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(items, (item, index) => (
                                <tr key={index}>
                                    <td>
                                    <i className={`fa fa-check ${obj.state.project.serviceType == item.name ? "text-success" : "text-danger"}`}></i>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                        </tr>
                    </tbody>
                </Table>
                <small></small>

            </div>
        </Col>
        <Col md={6}>
            <h6 className="mb-3 mt-2">Name and Email Address</h6>

            <Row tag="dl">
                <dt className="col-sm-4">First Name</dt>
                <dd className="col-sm-8"> {obj.state.project.firstName} </dd>

                <dt className="col-sm-4">Last Name</dt>
                <dd className="col-sm-8">{obj.state.project.lastName}</dd>

                <dt className="col-sm-4">Email</dt>
                <dd className="col-sm-8">{obj.state.project.email}</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
            <h6 className="my-3">Billing Address</h6>
            <Row tag="dl">
                <dt className="col-sm-4">Address</dt>
                <dd className="col-sm-8">{obj.state.project.address}</dd>

                <dt className="col-sm-4">City</dt>
                <dd className="col-sm-8">{obj.state.project.city}</dd>

                <dt className="col-sm-4">State/Province</dt>
                <dd className="col-sm-8">{obj.state.project.stateCode}</dd>

                <dt className="col-sm-4">ZIP Code</dt>
                <dd className="col-sm-8">{obj.state.project.zipCode}</dd>

                <dt className="col-sm-4">Phone</dt>
                <dd className="col-sm-8">{obj.state.project.phone}</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
            <h6 className="my-3">Project Details</h6>
            <Row tag="dl">
                <dt className="col-sm-4">Min sqft</dt>
                <dd className="col-sm-8">{obj.state.project.minSqft}</dd>

                <dt className="col-sm-4">Max sqft</dt>
                <dd className="col-sm-8">{obj.state.project.maxSqft}</dd>

                <dt className="col-sm-4"></dt>
                <dd className="col-sm-8">
                    <Button color='link' className="p-0"><i className="fa fa-angle-left mr-1"></i> Change</Button>
                </dd>
            </Row>
        </Col>
    </Row>
);

export class ServiceCreation extends React.Component {
    state = {
        currentStep: _.first(sequence),
        project: { firstName: 'Kevin', lastName: 'Heart', address: '564 What Now Avenue', bldgType: '', controlType: '', email: 'KHeart@gmail.com', emergency: '', insectType: '', serviceType: '', minSqft: '1000', maxSqft: '3500', city: 'Las Vegas', stateCode: '', zipCode: '89108', phone: '702-258-3691', comments: 'Teamwork makes the dream work' }
    }

    submit() {
        fetch("https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/services/createService",
        {
            method: 'POST',
            body: JSON.stringify(this.state.project)
        })
        .then(res => res.text())
        .then(fetchedData => {
            console.log(fetchedData);
        }).then(window.location.replace("https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/serviceassignment"));
    }

    render() {
        const { currentStep } = this.state;

        return (
            <Container>
                <HeaderMain
                    title="Service Creation"
                    className="my-4"
                />
                <Card>
                    <CardBody className="d-flex justify-content-center pt-5">
                        <Wizard
                            activeStep={currentStep}
                            onStepChanged={this._changeStep}
                        >
                            <Wizard.Step
                                id={sequence[0]}
                                icon={<i className="fa fa-shopping-basket fa-fw"></i>}
                                complete={this._isComplete(sequence[0])}
                            >
                                Service Type
                            </Wizard.Step>
                            <Wizard.Step
                                id={sequence[1]}
                                icon={<i className="fa fa-cube fa-fw"></i>}
                                complete={this._isComplete(sequence[1])}
                            >
                                Contact Info
                            </Wizard.Step>
                            <Wizard.Step
                                id={sequence[2]}
                                icon={<i className="fa fa-credit-card fa-fw"></i>}
                                complete={this._isComplete(sequence[2])}
                            >
                                Project Details
                            </Wizard.Step>
                            <Wizard.Step
                                id={sequence[3]}
                                icon={<i className="fa fa-navicon fa-fw"></i>}
                                complete={this._isComplete(sequence[3])}
                            >
                                Summary
                            </Wizard.Step>
                        </Wizard>
                    </CardBody>

                    <CardBody className="p-5">
                        {
                            (() => {
                                switch (this.state.currentStep) {
                                    case sequence[0]:
                                        return WizardStep1(this)
                                    case sequence[1]:
                                        return WizardStep2(this)
                                    case sequence[2]:
                                        return WizardStep3(this)
                                    case sequence[3]:
                                        return WizardStep4(this)
                                }
                            })()
                        }
                    </CardBody>

                    <CardFooter className="p-4 bt-0">
                        <div className="d-flex">
                            {
                                currentStep !== sequence[0] && (
                                    <Button onClick={() => { this._prevStep() }} color="link" className='mr-3'>
                                        <i className='fa fa-angle-left mr-2'></i>
                                        Previous
                                    </Button>
                                )
                            }
                            {
                                currentStep !== sequence[sequence.length - 1] && (
                                    <Button color='primary' onClick={() => { this._nextStep() }} className="ml-auto px-4">
                                        Next
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                            {
                                currentStep == sequence[sequence.length - 1] && (
                                    <Button color='primary' onClick={() => { this.submit() }} className="ml-auto px-4">
                                        Submit
                                        <i className='fa fa-angle-right ml-2'></i>
                                    </Button>
                                )
                            }
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }

    _changeStep = (stepId) => {
        this.setState({
            currentStep: stepId
        });
    }

    _prevStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index - 1]
        });
    }

    _nextStep = () => {
        const index = sequence.indexOf(this.state.currentStep);
        this.setState({
            currentStep: sequence[index + 1]
        });
    }

    _isComplete = (stepId) =>
        sequence.indexOf(stepId) < sequence.indexOf(this.state.currentStep)
}
