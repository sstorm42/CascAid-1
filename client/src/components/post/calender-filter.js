import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const CalenderFilters = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <h4>Filter</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>Title</label>
                    <input type="text" className="form-control" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Post Type</label>
                    <input type="text" className="form-control" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Impact Areas</label>
                    <input type="text" className="form-control" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Skills</label>
                    <input type="text" className="form-control" />
                </Col>
            </Row>
            <br />
        </>
    );
};
export default CalenderFilters;
