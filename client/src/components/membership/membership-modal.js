import React, { useState } from 'react';
import { Button, Row, Col, Image, Container, Table, Modal } from 'react-bootstrap';
import { DeleteButtonRender, EditButtonRender } from '../form_template/buttons-render';
import { allMembershipTypes, getMembershipByValue } from '../../constants/membership-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
const MembershipModal = (props) => {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const membershipModal = props.membershipModal;
    const setMembershipModal = props.setMembershipModal;
    const mode = props.mode;
    const options = props.users.map((user) => {
        return {
            value: user._id,
            label: (
                <Row>
                    <Col sm={1}>
                        <img src={user.profilePicture ? user.profilePicture : defaultOrganizationProfilePicture} height="30px" width="30px" />
                    </Col>
                    <Col>{user.name}</Col>
                </Row>
            ),
        };
    });
    const sampleOptions = [
        {
            value: 'me',
            label: (
                <Row>
                    <Col sm={1}>
                        <img src="https://picsum.photos/100/100" height="30px" width="30px" />
                    </Col>
                    <Col>Chocolate</Col>
                </Row>
            ),
            flagPath: 'https://picsum.photos/100/100',
        },
        {
            value: 'rs',
            label: (
                <Row>
                    <Col sm={1}>
                        <img src="https://picsum.photos/100/100" height="30px" width="30px" />
                    </Col>
                    <Col>Chocolate</Col>
                </Row>
            ),
            flagPath: 'https://picsum.photos/100/100',
        },
    ];

    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={membershipModal}
            onHide={() => {
                setMembershipModal(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Membership Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <label>Organization Name</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AsyncSelect
                                cacheOptions
                                loadOptions={props.promiseOptions}
                                onChange={(value) => {
                                    props.handleMembershipInfoChange('userId', value.value);
                                }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Membership type</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Select
                                options={allMembershipTypes}
                                onChange={(value) => {
                                    props.handleMembershipInfoChange('membershipType', value.value);
                                }}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>Start Time</label>
                        </Col>

                        <Col>
                            <DatePicker
                                className="form-control"
                                selected={startTime}
                                onChange={(date) => {
                                    setStartTime(date);
                                    props.handleMembershipInfoChange('startTime', date);
                                }}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <label>End Time</label>
                        </Col>

                        <Col>
                            <DatePicker
                                className="form-control"
                                selected={endTime}
                                onChange={(date) => {
                                    setEndTime(date);
                                    props.handleMembershipInfoChange('endTime', date);
                                }}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                            />
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                        setMembershipModal(false);
                    }}
                >
                    Cancel
                </Button>
                {mode === 'create' ? (
                    <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                            props.submitMembership('create');
                            setMembershipModal(false);
                        }}
                    >
                        Create
                    </Button>
                ) : (
                    <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                            props.submitMembership('edit');
                            setMembershipModal(false);
                        }}
                    >
                        Update
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};
export default MembershipModal;
