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
    const membership = props.membership;
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
                        <Col style={{ zIndex: 400 }}>
                            <AsyncSelect
                                placeholder="Type at least 3 letter"
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
                        <Col style={{ zIndex: 300 }}>
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
                            <br />
                            <br />
                        </Col>

                        <Col style={{ zIndex: 200 }}>
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

                    <Row class="form-group">
                        <Col sm={6}>Is Current Member?</Col>
                        <Col>
                            <div class="custom-control custom-switch" style={{ zIndex: 100 }}>
                                <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="customSwitch1"
                                    checked={membership.isCurrent}
                                    onChange={() => {
                                        props.handleMembershipInfoChange('isCurrent', !membership.isCurrent);
                                    }}
                                />
                                <label class="custom-control-label" for="customSwitch1"></label>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    {!membership.isCurrent && (
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
                    )}
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
