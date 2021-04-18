import React, { useState } from 'react';
import { Button, Row, Col, Image, Container, Table, Modal } from 'react-bootstrap';
import { DeleteButtonRender, EditButtonRender } from '../form_template/buttons-render';
import { allMembershipTypes, getMembershipByValue } from '../../constants/membership-types';
import Select from 'react-select';
import MonthYearPicker from 'react-month-year-picker';

const MembershipList = (props) => {
    const [membershipModal, setMembershipModal] = useState(false);
    const [newMembership, setNewMembership] = useState({ organization: '', membershipType: '', startTime: { month: 1, year: 2021 }, endTime: { month: 1, year: 2021 } });
    const memberships = props.memberships;
    const addNewMembership = props.addNewMembership;
    return (
        <>
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
                                <Select options={[]} placeholder="type here" />
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
                                        console.log(value);
                                    }}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <MonthYearPicker
                                    selectedMonth={newMembership.startTime.month}
                                    selectedYear={newMembership.startTime.year}
                                    minYear={2000}
                                    maxYear={2030}
                                    onChangeYear={(year) => {
                                        let membership = newMembership;
                                        membership.startTime.year = year;
                                        setNewMembership({ ...membership });
                                    }}
                                    onChangeMonth={(month) => {
                                        let membership = newMembership;
                                        membership.startTime.month = month;
                                        setNewMembership({ ...membership });
                                    }}
                                />
                            </Col>

                            <Col>
                                <MonthYearPicker
                                    selectedMonth={newMembership.endTime.month}
                                    selectedYear={newMembership.endTime.year}
                                    minYear={2000}
                                    maxYear={2030}
                                    onChangeYear={(year) => {
                                        let membership = newMembership;
                                        membership.endTime.year = year;
                                        setNewMembership({ ...membership });
                                    }}
                                    onChangeMonth={(month) => {
                                        let membership = newMembership;
                                        membership.endTime.month = month;
                                        setNewMembership({ ...membership });
                                    }}
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
                    <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => {
                            addNewMembership(newMembership);
                            setMembershipModal(false);
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <h6>Memberships</h6>
            <Table>
                <thead></thead>
                <tbody>
                    {memberships.map((member, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <Image src={member.image} style={{ height: 32 }} />
                                </td>
                                <td>
                                    <b>{member.org}</b>
                                </td>
                                <td>{member.status}</td>
                                <td>{member.type}</td>
                                <td>{member.startTime}</td>
                                <td>{member.endTime}</td>
                                <td>
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                    setMembershipModal(true);
                }}
            >
                Add New Membership
            </Button>
            <hr />
        </>
    );
};
export default MembershipList;
