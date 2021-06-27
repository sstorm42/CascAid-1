import React from 'react';
import { Container, Row, Col, Image, Button, Table } from 'react-bootstrap';
import { defaultOrganizationProfilePicture, defaultIndividualProfilePicture } from '../../constants/default-images';
import { DetailsButtonRender, RemoveUserFromCultivation } from '../form_template/buttons-render';
import moment from 'moment';
const CultivationDetails = (props) => {
    const cultivation = props.cultivation;
    const handleGoToUserDetailsPage = props.handleGoToUserDetailsPage;
    const handleRemoveUsersFromCultivation = props.handleRemoveUsersFromCultivation;
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col>
                            <h4>Cultivation Details</h4>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <h4>{cultivation.title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>{moment(cultivation.createdAt).format('LLLL')}</small>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <p className="justify-text">{cultivation.description}</p>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <h6>USERS</h6>
                        </Col>
                    </Row>
                    {cultivation.users && cultivation.users.length > 0 ? (
                        <Row>
                            <Col>
                                <Table striped bordered size="sm" hover>
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
                                                        {/* &nbsp;
                                                        <RemoveUserFromCultivation
                                                            onClick={() => {
                                                                handleRemoveUsersFromCultivation(user._id);
                                                            }}
                                                        /> */}
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
export default CultivationDetails;
