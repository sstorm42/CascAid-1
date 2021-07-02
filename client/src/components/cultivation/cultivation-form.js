import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
import React from 'react';
import { Button, Col, Container, Image, Row, Table } from 'react-bootstrap';
import { Field } from 'redux-form';
import { DetailsButtonRender, RemoveUserFromCultivation } from '../form_template/buttons-render';
import { InputRender, TextRender } from '../form_template/input-render';
const CultivationForm = (props) => {
    const editMode = props.editMode;
    const handleGoToUserDetailsPage = props.handleGoToUserDetailsPage;
    const handleRemoveUsersFromCultivation = props.handleRemoveUsersFromCultivation;
    const cultivation = props.cultivation;
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col sm={6}>{editMode ? <h4>Edit Cultivation</h4> : <h4>Create Cultivation</h4>}</Col>
                        <Col sm={6} className="right-align">
                            <Button
                                size="sm"
                                type="button"
                                variant="outline-primary"
                                onClick={() => {
                                    props.handleGoToManageCultivations();
                                }}
                            >
                                Manage Cultivations
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <form onSubmit={props.handleOnSubmit}>
                        <Field name="title" type="text" component={InputRender} label="Title" placeholder="Title..." />
                        <Field name="description" type="text" component={TextRender} label="Description" placeholder="Description..." col1={4} col2={8} />

                        <Row>
                            <Col sm={4}></Col>
                            <Col sm={8}>
                                <Button variant="primary" size="sm" type="submit">
                                    {editMode ? 'Update' : 'Save'}
                                </Button>
                                &nbsp;
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="outline-primary"
                                    onClick={() => {
                                        props.handleGoToManageCultivations();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </form>
                    <hr />
                    <Row>
                        <Col>
                            <h6>USERS</h6>
                        </Col>
                    </Row>
                    {editMode && cultivation.users && cultivation.users.length > 0 ? (
                        <Row>
                            <Col>
                                <Table striped bordered hover responsive size="sm">
                                    <tbody>
                                        {cultivation.users.map((user, i) => {
                                            let name = '';
                                            let profilePicture = '';
                                            if (user.userType === 'individual') {
                                                name = user.basicInfo.firstName + ' ' + user.basicInfo.lastName;
                                                profilePicture = user.basicInfo.profilePicture
                                                    ? user.basicInfo.profilePicture
                                                    : defaultIndividualProfilePicture;
                                            } else if (user.userType === 'organization') {
                                                name = user.basicInfo.name;
                                                profilePicture = user.basicInfo.profilePicture
                                                    ? user.basicInfo.profilePicture
                                                    : defaultOrganizationProfilePicture;
                                            }
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <Image src={profilePicture} width="40" />
                                                    </td>
                                                    <td>{name}</td>
                                                    <td>
                                                        <DetailsButtonRender
                                                            onClick={() => {
                                                                handleGoToUserDetailsPage(user.userType, user._id);
                                                            }}
                                                        />{' '}
                                                        &nbsp;
                                                        <RemoveUserFromCultivation
                                                            onClick={() => {
                                                                handleRemoveUsersFromCultivation(user._id);
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col>No User Added To The List</Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default CultivationForm;
