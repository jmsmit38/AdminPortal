/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/contractorhomepage/   
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our contractor homepage, this page is static and has been removed for the purposes of capstone.

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
*/

import React from 'react';
import faker from 'faker/locale/en_US';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Card,
    CardBody,
    Badge,
    Table,
    CardTitle,
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    ListGroup,
    ListGroupItem,
    Media,
    Col
} from '../../../components';
import { setupPage } from '../../../components/Layout/setupPage';

import { HeaderMain } from "../../components/HeaderMain";

import {
    TasksMedia
} from "../../components/ProjectsDashboards/TasksMedia";
import {
    TinyDonutChart
} from "../../components/ProjectsDashboards/TinyDonutChart"
import {
    TinyDonutChartAllProjects
} from "../../components/ProjectsDashboards/TinyDonutChartAllProjects"
import {
    TimelineMini
} from "../../components/Timeline/TimelineMini"
import { DraggableProjects } from './DraggableProjects';

const ProjectsDashboard = () => (
    <Container>
        <Row className="mb-5">
            <Col lg={12}>
                <HeaderMain
                    title="Contractor Homepage"
                    className="mb-4 mb-lg-5"
                />
            </Col>
            <Col lg={12}>
                <Card className="mb-3">
                    <CardBody>
                        <CardTitle tag="h6" className="mb-3">
                            Projects
                    </CardTitle>
                        <InputGroup>
                            <Input placeholder="Search Projects..." />
                            <InputGroupAddon addonType="append">
                                <Button color="secondary" outline tag={Link} to="/apps/projects/list">
                                    <i className="fa fa-search"></i>
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardBody>
                    <DraggableProjects />
                </Card>
            </Col>
        </Row>
    </Container>


);

export default setupPage({
    pageTitle: 'Projects Dashboard'
})(ProjectsDashboard);