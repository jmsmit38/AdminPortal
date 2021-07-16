/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/notificationspage  
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our notifications page, this page is static and will be used for sending 
notifications and recieving them.

Acknowledgements:
We would like to thank airframe for the wigets to make this page possible

References:

Airframe React - http://dashboards.webkom.co/react/airframe/dashboards/projects/ 
*/

import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import {
    Container,
    ButtonToolbar,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FloatGrid as Grid,
    Form,
    FormGroup,
    FormText,
    CustomInput,
    Input,
    Label,
    Card,
    Media,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Progress,
    Table,
    CardFooter,
    Button,
    CardHeader
} from '../../../components';
import { applyColumn } from '../../../components/FloatGrid';

import { HeaderMain } from "../../components/HeaderMain";
import {
    Activity
} from "../../components/Dropdowns/Activity";
import {
    MetricVsTarget
} from "../../components/Analytics/MetricVsTarget";
import {
    WebsitePerformance
} from "../../components/Analytics/WebsitePerformance";
import {
    AudienceMetricsChart
} from "./components/AudienceMetricsChart";
import {
    TinyAreaChart
} from "../../components/Analytics/TinyAreaChart";
import {
    SimpleLineChart
} from "../../Graphs/ReCharts/components/SimpleLineChart";
import {
    Comment
} from "../../components/Comment";
import {
    ProfileOverviewCard
}
    from "../../components/Profile/ProfileOverviewCard"
import {
    ChatCardFooter
} from "../../components/Chat/ChatCardFooter";

import classes from './Analytics.scss';

const LAYOUT = {
    'metric-v-target-users': { h: 4, md: 4 },
    'metric-v-target-sessions': { h: 4, md: 4 },
    'metric-v-target-pageviews': { h: 4, md: 4 },
    'analytics-audience-metrics': { h: 9, minH: 7 },
    'analytics-audience-metric': { h: 11, minH: 7 },
    'comments': { h: 8, minH: 7 },
    'traffic-channels': { md: 6, h: 6 },
    'sessions': { md: 6, h: 6, maxH: 9, minW: 3 },
    'spend': { md: 6, h: 7 },
    'website-performance': { md: 6, h: 11 },
    'organic-traffic': { md: 6, h: 10 }
}

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

export class NotificationsHomepage extends React.Component {
    state = {
        layouts: _.clone(LAYOUT)
    }

    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

    render() {
        const { layouts } = this.state;

        return (
            <React.Fragment>
                <Container fluid={false}>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain
                            title="Notifications"
                            className="mt-0"
                        />
                    </div>
                </Container>

                <Grid>

                    <Grid.Row
                        onLayoutChange={layouts => this.setState({ layouts })}
                        columnSizes={this.state.layouts}
                        rowHeight={55}
                    >
                        <Grid.Col {...(applyColumn('analytics-audience-metric', layouts))}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-4">
                                        Send Announcements
                                <span className="small ml-1 text-muted">

                                        </span>
                                    </CardTitle>
                                    { /* START Form */}
                                    <Form>
                                        { /* START Input */}
                                        <FormGroup>
                                            <Label for="input-2">
                                                Send To:
                                    </Label>
                                            <Input
                                                type="text"
                                                name=""
                                                id="input-2"
                                                placeholder="Enter Name..."
                                            />
                                        </FormGroup>
                                        { /* END Input */}
                                        { /* START Radios */}
                                        <FormGroup>
                                            <Label for="operatingSystem" className="pt-0">
                                                Role Type
                                    </Label>
                                            <div>
                                                <CustomInput
                                                    type="radio"
                                                    id="operatingSystem1"
                                                    name="operatingSystem"
                                                    label="Administrator"
                                                    inline
                                                    defaultChecked
                                                />
                                                <CustomInput
                                                    type="radio"
                                                    id="operatingSystem2"
                                                    name="operatingSystem"
                                                    label="Contractor"
                                                    inline
                                                />
                                                <CustomInput
                                                    type="radio"
                                                    id="operatingSystem3"
                                                    name="operatingSystem"
                                                    label="HomeOwner"
                                                    inline
                                                    disabled
                                                />
                                            </div>
                                        </FormGroup>
                                        { /* END Radios */}
                                        { /* START Select */}
                                        <FormGroup>
                                            <Label for="country-selector-2">
                                                State
                                    </Label>
                                            <CustomInput
                                                type="select"
                                                name="customSelect"
                                                id="country-selector-2"
                                            >
                                                <option value="">Select Country...</option>
                                                <option>United States of America (US)</option>
                                                <option>United Kingdom (UK)</option>
                                                <option>Australia</option>
                                                <option>Canada</option>
                                                <option>Other...</option>
                                            </CustomInput>
                                        </FormGroup>
                                        { /* END Select */}
                                        { /* START File Select */}
                                        <FormGroup>
                                            <Label for="addCv2">
                                                Add Attachments
                                    </Label>
                                            <CustomInput type="file" id="addCv2" name="customFile" label="Choose file..." />
                                            <FormText color="muted">
                                                Accepted formats: pdf, doc, txt. Max file size 7Mb
                                    </FormText>
                                        </FormGroup>
                                        { /* END File Select */}
                                        { /* START Textarea */}
                                        <FormGroup>
                                            <Label for="message-2">
                                                Message
                                    </Label>
                                            <Input
                                                type="textarea"
                                                name="text"
                                                id="message-2"
                                                placeholder="Enter Your Message..."
                                                className="mb-2"
                                            />
                                            <Button color="primary">Send</Button>
                                        </FormGroup>
                                        { /* END Textarea */}
                                    </Form>
                                    { /* END Form */}
                                </CardBody>
                            </Card>

                        </Grid.Col>

                        <Grid.Col {...(applyColumn('analytics-audience-metrics', layouts))}>
                            { /* START Card Widget */}
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-0">
                                        Activity
                                        <span className="small ml-1 text-muted">
                                            #3.04
                                        </span>
                                    </CardTitle>
                                    <ListGroup flush className="mb-4">
                                        <ListGroupItem className="bt-0">
                                            <Activity
                                                iconColorBelow="success"
                                                icon="check"
                                            />
                                        </ListGroupItem>
                                        <ListGroupItem to="/apps/profile-details" className="bt-0">
                                            <Activity
                                                iconColorBelow="danger"
                                                icon="close"
                                            />
                                        </ListGroupItem>
                                        <ListGroupItem to="/apps/profile-details" className="bt-0">
                                            <Activity
                                                iconColorBelow="warning"
                                                icon="exclamation"
                                            />
                                        </ListGroupItem>
                                        <ListGroupItem to="/apps/profile-details" className="bt-0">
                                            <Activity
                                                iconColorBelow="primary"
                                                icon="info"
                                            />
                                        </ListGroupItem>
                                        <ListGroupItem to="/apps/profile-details" className="bt-0">
                                            <Activity
                                                iconColorBelow="primary"
                                                icon="info"
                                            />
                                        </ListGroupItem>
                                    </ListGroup>
                                </CardBody>
                            </Card>
                            { /* END Card Widget */}
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
