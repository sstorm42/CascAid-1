import React from 'react';
import { Card, CardColumns, Badge, Row, Col } from 'react-bootstrap';
import { defaultIndividualProfilePicture } from '../../constants/default-images';
import { AddUserToCultivation } from '../form_template/buttons-render';
const IndividualListView = (props) => {
    const allIndividuals = props.allIndividuals;
    const showCultivationListModal = props.showCultivationListModal;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allIndividuals && allIndividuals.length > 0) {
        return (
            <CardColumns>
                {allIndividuals.map((ind, i) => {
                    if (ind && ind.basicInfo && ind.basicInfo.firstName) {
                        return (
                            <Card className="special-btn special-card" key={i}>
                                <Card.Img
                                    variant="top"
                                    src={ind.basicInfo.profilePicture ? ind.basicInfo.profilePicture : defaultIndividualProfilePicture}
                                    alt="No Image Found"
                                    className="individual-list-image"
                                    onClick={() => {
                                        props.gotoIndividualDetails(ind._id);
                                    }}
                                />
                                <Card.Body
                                    onClick={() => {
                                        props.gotoIndividualDetails(ind._id);
                                    }}
                                >
                                    <Card.Text className="left-text bold-text">{ind.basicInfo.firstName + ' ' + ind.basicInfo.lastName}</Card.Text>
                                    {ind.individualTypes &&
                                        ind.individualTypes.length > 0 &&
                                        ind.individualTypes.map((type, i) => {
                                            return (
                                                <Badge variant="info" className="badge-single-small" key={i}>
                                                    {type.label}
                                                </Badge>
                                            );
                                        })}
                                    {ind.impactAreas &&
                                        ind.impactAreas.length > 0 &&
                                        ind.impactAreas.map((area, i) => {
                                            return (
                                                <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                    {area.label}
                                                </Badge>
                                            );
                                        })}
                                    {ind.skills &&
                                        ind.skills.length > 0 &&
                                        ind.skills.map((skill, i) => {
                                            return (
                                                <Badge variant="light" className="badge-single-small skill-badge" key={i}>
                                                    {skill.label}
                                                </Badge>
                                            );
                                        })}
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
                                </Card.Body>
                                <Card.Footer>
                                    <AddUserToCultivation
                                        buttonTitle="Add To Cultivation List"
                                        onClick={() => {
                                            showCultivationListModal(ind._id);
                                        }}
                                    />
                                </Card.Footer>
                            </Card>
                        );
                    }
                })}
            </CardColumns>
        );
    } else return <h4>No Individuals Found</h4>;
};
export default IndividualListView;
