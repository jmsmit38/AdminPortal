/*
Author:    Jabrail Ahmed 
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/userprofileedit
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our user profiles edit page and is currently static but meant for an admin to update users
information if a user calls and wanted them to update it.

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
    Input,
    Card,
    Button,
    CardBody,
    CardFooter,
    FormText,
    CardTitle,
    CustomInput,
    Label,
    FormGroup,
    Form
} from '../../../components';

import { HeaderMain } from "../../components/HeaderMain";
import { ProfileLeftNav } from "../../components/Profile/ProfileLeftNav";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";

const ProfileEdit = () => (
    <React.Fragment>
        <Container>
            <HeaderMain 
                title="Profile Edit"
                className="mb-5 mt-4"
            />
            { /* START Content */}
            <Row>
                <Col lg={ 12 }>
                   <ProfileHeader />
                </Col>
                <Col lg={ 3 }>
                    <ProfileLeftNav />
                </Col>
                <Col lg={ 9 }>
                    <Card>
                        <CardBody>
                            <div className="d-flex mb-4">
                               <CardTitle tag="h6">
                                    Profile Edit
                               </CardTitle>
                                <span className="ml-auto align-self-start small">
                                    Fields mark as <span className="text-danger">*</span> is required.
                                </span>
                            </div>
                            <Form>
                                <div className="small mt-4 mb-3">
                                    Required
                                </div>
                                { /* START File Select */}
                                <FormGroup row>
                                    <Label for="uploadYourAvatar" sm={3} className="text-right">
                                        Upload Your Avatar
                                    </Label>
                                    <Col sm={8}>
                                        <CustomInput type="file" id="uploadYourAvatar" name="customFile" label="Browse for a file to upload...." />
                                        <FormText color="muted">
                                            JPG, GIF, PNG, MOV and AVI. Please choose a files under 2GB to upload. File sizes are 400 x 300px.
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                { /* END File Select */}
                                { /* START Input */}
                                <FormGroup row>
                                    <Label for="firstName" sm={3} className="text-right">
                                        <span className="text-danger">*</span> First Name
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="text" 
                                            name="" 
                                            id="firstName" 
                                            placeholder="First Name..." 
                                        />
                                    </Col>
                                </FormGroup>
                                { /* END Input */}
                                { /* START Input */}
                                <FormGroup row>
                                    <Label for="lastName" sm={3} className="text-right">
                                        <span className="text-danger">*</span> Last Name
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="text" 
                                            name="text" 
                                            id="lastName" 
                                            placeholder="Last Name..." 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="email" sm={3} className="text-right">
                                        <span className="text-danger">*</span> Email
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="text" 
                                            name="text" 
                                            id="email" 
                                            placeholder="Email Address..." 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="address" sm={3} className="text-right">
                                        <span className="text-danger">*</span> Address
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="text" 
                                            name="text" 
                                            id="address1" 
                                            placeholder="Home Address..." 
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="phone" sm={3} className="text-right">
                                        <span className="text-danger">*</span> Phone Number
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="text" 
                                            name="text" 
                                            id="phone" 
                                            placeholder="Phone Number..." 
                                        />
                                    </Col>
                                </FormGroup>
                                { /* END Input */}
                                { /* START Select */}

                                { /* END Select */}
                                { /* START Radios */}
                                <div className="small mt-4 mb-3">
                                    Fill Profile Description
                                </div>
                                { /* END Radios */}
                                { /* START Textarea */}
                                <FormGroup row>
                                    <Label for="profile" sm={3} className="text-right">
                                        Profile Description
                                    </Label>
                                    <Col sm={8}>
                                        <Input 
                                            type="textarea" 
                                            name="text" 
                                            id="profile" 
                                            placeholder="Please Describe Your Profile..." 
                                            className="mb-2"
                                        />
                                    </Col>
                                </FormGroup>
                                { /* END Textarea */}
                                { /* START Input */}
                                { /* END Input */}
                            </Form>
                            { /* END Form */}
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button color="primary">
                                Update Profile
                            </Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            { /* END Content */}

        </Container>
    </React.Fragment>
);

export default ProfileEdit;