/*
Author:    Jabrail Ahmed and Calvin Dam
Date:      16 April 2021
Course:    CS 4500, University of Utah, School of Computing 
Copyright: CS 4500 and Home Monitor Team - This work may not be copied for use in Academic Coursework.
Deployed URL:  https://master.d1ixmm1bru99ga.amplifyapp.com/dashboards/adminhomepage/   
Github Page:   https://capstone-cs.eng.utah.edu/home-monitor/beta
Comments to Evaluators:
This code is for our admin homepage, this page is static execpt for the reviews at the bottom.

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
    CustomInput,
    ButtonToolbar,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FloatGrid as Grid,
    Card,
    Media,
    CardBody,
    cardText,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    option,
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

import classes from './AdminHomepage.scss';
import { Body } from 'node-fetch';



/*
    CONSTS
*/
const ACTIVE_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/services/get/0/compStatus/Active/null/null";
const COMPLETED_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/services/get/0/compStatus/Completed/null/null";
const REQUESTED_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/services/get/0/compStatus/Requested/null/null";
const REVIEWS_URL = "https://q7jjrplae3.execute-api.us-west-2.amazonaws.com/dev/reviews/get/3/null/null/null/null";


const LAYOUT = {
    'metric-v-target-users': { h: 4, md: 4 },
    'metric-v-target-sessions': { h: 4, md: 4 },
    'metric-v-target-pageviews': { h: 4, md: 4 },
    'analytics-audience-metrics': { h: 9, minH: 7 },
    'comments': { h: 8, minH: 7 },
    'traffic-channels': { md: 6, h: 6 },
    'notificaitons': { h: 8, minH: 7 },
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

export class Analytics extends React.Component {
    state = {
        layouts: _.clone(LAYOUT),
        activeCount: [],
        completedCount: [],
        requestCount: [],
        reviews: []
    }

    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

    componentDidMount() {
        fetch(ACTIVE_URL)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                this.setState({ activeCount: fetchedData.count });
                console.log(this.state.activeCount)
            });
        fetch(COMPLETED_URL)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                this.setState({ completedCount: fetchedData.count });
                console.log(this.state.completedCount)
            });
        fetch(REQUESTED_URL)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                this.setState({ requestCount: fetchedData.count });
                console.log(this.state.requestCount)
            });

        fetch(REVIEWS_URL)
            .then(res => res.json())
            .then(fetchedData => {
                console.log(fetchedData)
                this.setState({ reviews: fetchedData.reviews});
                console.log(this.state.reviews)
            });

    }

    render() {
        const { activeCount, completedCount, requestCount, reviews, layouts } = this.state;

        return (
            <React.Fragment>
                <Container fluid={false}>
                    <div className="d-flex mt-3 mb-5">
                        <HeaderMain
                            title="Admin Homepage"
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
                        <Grid.Col {...(applyColumn('metric-v-target-users', layouts))}>
                            <Card type="side-border" color="secondary" className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6">
                                        Projects Requested
                                </CardTitle>
                                    {requestCount}
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        <Grid.Col {...(applyColumn('metric-v-target-sessions', layouts))}>
                            <Card type="side-border" color="primary" className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6">
                                        Projects In Progress
                                </CardTitle>
                                    {activeCount}
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        <Grid.Col {...(applyColumn('metric-v-target-pageviews', layouts))}>
                            <Card type="side-border" color="success" className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6">
                                        Projects Completed
                                </CardTitle>
                                    {completedCount}
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        <Grid.Col {...(applyColumn('analytics-audience-metrics', layouts))}>
                            <Card>
                                <CardHeader className="bb-0 pt-3 pb-4 bg-none" tag="h6">
                                    <i className="fa fa-ellipsis-v mr-2 text-body"></i> Customers Sales Metrics
                                    { /* START Select */}
                                    <FormGroup row>
                                        <Label for="defaultSelect" sm={3}>
                                            Service Type
                                            </Label>
                                        <Input
                                            type="select"
                                            name="select"
                                            id="defaultSelect"
                                        >
                                            <option defaultValue="">Open this Select Menu</option>
                                            <option>Pest Control</option>
                                            <option>Solar Power</option>
                                            <option>Protection</option>
                                            <option>Home Loans</option>
                                            <option>HVAC</option>
                                        </Input>
                                    </FormGroup>
                                    { /* END Select */}
                                </CardHeader>

                                <CardBody className="d-flex flex-column">
                                    <Grid.Ready>
                                        <AudienceMetricsChart height="100%" className="flex-fill" />
                                    </Grid.Ready>
                                </CardBody>
                                {/* <CardFooter>
                                    <Media className="small">
                                        <Media left>
                                            <i className="fa fa-fw fa-info-circle mr-2"></i>
                                        </Media>
                                        <Media body>
                                            How do your users (visitors), sessions (visits) and pageviews
                                            metrics for <abbr title="attribute" className="text-dark">www.webkom.com</abbr> compare to your targets over the last 30 days?
                                        </Media>
                                    </Media>
                                </CardFooter> */}
                            </Card>
                        </Grid.Col>
                        <Grid.Col {...(applyColumn('comments', layouts))}>
                            <Card className="mb-3">
                                <CardBody>
                                    <CardTitle tag="h6" className="mb-4">
                                        Recent Reviews
                                        <span className="small ml-1 text-muted">
                                        </span>
                                    </CardTitle>
                                    {reviews.map((review, i) => <Comment key={i} body={review.body} />)}
                                </CardBody>
                            </Card>
                        </Grid.Col>
                        <Grid.Col {...(applyColumn('notifications', layouts))}>
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
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
