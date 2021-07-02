import { defaultIndividualProfilePicture } from '@Constants/default-images';
import React from 'react';
import { Badge, Col, Form, Image, Row, Table } from 'react-bootstrap';
import { AddUserToCultivation } from '../form_template/buttons-render';
const IndividualListView = (props) => {
    const allIndividuals = props.allIndividuals;
    const showCultivationListModal = props.showCultivationListModal;
    const selectedMultipleUserId = props.selectedMultipleUserId;
    const setSelectedMultipleUserId = props.setSelectedMultipleUserId;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    const handleAddRemoveUserId = (userId) => {
        const multipleUserId = selectedMultipleUserId;
        if (multipleUserId.indexOf(userId) === -1) {
            multipleUserId.push(userId);
        } else {
            var index = multipleUserId.indexOf(userId);
            if (index > -1) {
                multipleUserId.splice(index, 1);
            }
        }
        setSelectedMultipleUserId([...multipleUserId]);
    };
    // const handleSelectAllUsersId = () => {};

    if (allIndividuals && allIndividuals.length > 0) {
        return (
            <Table striped bordered hover responsive size="sm">
                <tbody>
                    {selectedMultipleUserId && selectedMultipleUserId.length > 0 ? (
                        <tr>
                            <td colSpan="4">
                                <AddUserToCultivation
                                    button_title="Add All Selected Users To Cultivation List"
                                    onClick={() => {
                                        showCultivationListModal(selectedMultipleUserId);
                                    }}
                                />
                                &nbsp;
                            </td>
                        </tr>
                    ) : (
                        <></>
                    )}
                    {allIndividuals.map((ind, i) => {
                        if (ind && ind.basicInfo && ind.basicInfo.firstName) {
                            return (
                                <tr key={i}>
                                    <td>
                                        <Form.Group controlId={'formBasicCheckbox_userId_' + ind._id}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedMultipleUserId.includes(ind._id)}
                                                onChange={() => {
                                                    handleAddRemoveUserId(ind._id);
                                                }}
                                            />
                                        </Form.Group>
                                    </td>
                                    <td
                                        className="special-btn"
                                        onClick={() => {
                                            props.gotoIndividualDetails(ind._id);
                                        }}
                                    >
                                        <Image
                                            thumbnail
                                            width="200"
                                            src={ind.basicInfo.profilePicture ? ind.basicInfo.profilePicture : defaultIndividualProfilePicture}
                                            alt="No Image Found"
                                            className="individual-list-image"
                                        />
                                    </td>
                                    <td
                                        className="special-btn"
                                        onClick={() => {
                                            props.gotoIndividualDetails(ind._id);
                                        }}
                                    >
                                        <Row>
                                            <Col>
                                                <p className="left-text bold-text">{ind.basicInfo.firstName + ' ' + ind.basicInfo.lastName}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {ind.impactAreas &&
                                                    ind.impactAreas.length > 0 &&
                                                    ind.impactAreas.map((area, i) => {
                                                        return (
                                                            <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                                {area.label}
                                                            </Badge>
                                                        );
                                                    })}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {ind.skills &&
                                                    ind.skills.length > 0 &&
                                                    ind.skills.map((skill, i) => {
                                                        return (
                                                            <Badge variant="light" className="badge-single-small skill-badge" key={i}>
                                                                {skill.label}
                                                            </Badge>
                                                        );
                                                    })}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {ind.basicInfo.address ? (
                                                    <Row>
                                                        <Col>
                                                            <small className="gray-text">
                                                                {ind.basicInfo.address.street1 +
                                                                    ', ' +
                                                                    ind.basicInfo.address.street2 +
                                                                    ', ' +
                                                                    ind.basicInfo.address.city +
                                                                    ', ' +
                                                                    ind.basicInfo.address.code}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    <></>
                                                )}
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        <AddUserToCultivation
                                            hover_title="Add To Cultivation List"
                                            onClick={() => {
                                                showCultivationListModal([ind._id]);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        } else return <tr key={i}></tr>;
                    })}
                    {selectedMultipleUserId && selectedMultipleUserId.length > 0 ? (
                        <tr>
                            <td colSpan="4">
                                <AddUserToCultivation
                                    button_title="Add All Selected Users To Cultivation List"
                                    onClick={() => {
                                        showCultivationListModal(selectedMultipleUserId);
                                    }}
                                />
                                &nbsp;
                            </td>
                        </tr>
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
        );
    } else return <h4>No Individuals Found</h4>;
};
export default IndividualListView;
