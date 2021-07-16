import React from 'react';
import { Container, Row, Col } from '../../../components';

import {
    AdvancedTableB,
} from './components';
import { HeaderMain } from "../../components/HeaderMain";

export const Reviews = () => (
    <Container>
        <HeaderMain
            title="Reviews"
            className="mb-5 mt-4"
        />
        <Row className="mb-5">
            <Col>
                <AdvancedTableB />
            </Col>
        </Row>
    </Container>
);
