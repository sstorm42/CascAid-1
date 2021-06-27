import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { allCalenderPostTypes } from '../../constants/post-types';
const CalenderFilters = (props) => {
    const filter = props.filter;
    const changeFilterValue = props.changeFilterValue;
    const impactAreas = props.impactAreas;
    const skills = props.skills;
    return (
        <>
            <Row>
                <Col>
                    <label>Post Title</label>
                    <input className="form-control" type="text" value={filter.title} onChange={(e) => changeFilterValue('title', e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Post Type</label>
                    <Select
                        onChange={(value) => changeFilterValue('postTypes', value)}
                        isMulti={true}
                        options={allCalenderPostTypes}
                        value={filter.postTypes}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Impact Area</label>
                    <Select
                        onChange={(value) => changeFilterValue('impactAreas', value)}
                        isMulti={true}
                        options={props.impactAreas}
                        value={filter.impactAreas}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <label>Skill</label>
                    <Select onChange={(value) => changeFilterValue('skills', value)} isMulti={true} options={skills} value={filter.skills} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Show Only Top Need"
                                checked={props.filter.topNeed}
                                onChange={() => {
                                    changeFilterValue('topNeed', !props.filter.topNeed);
                                }}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <div style={{ height: 50 }} />
            <Row>
                <Col>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            props.resetFilter();
                        }}
                    >
                        Reset
                    </Button>
                    &nbsp;
                    <Button
                        size="sm"
                        onClick={() => {
                            props.handleOnApplyFilter();
                        }}
                    >
                        Search
                    </Button>
                </Col>
            </Row>
            <div style={{ height: 25 }} />
        </>
    );
};
export default CalenderFilters;
