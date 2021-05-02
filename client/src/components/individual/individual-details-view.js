import React from 'react';
import { Badge, Col, Container, Image, Row } from 'react-bootstrap';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { defaultIndividualProfilePicture } from '../../constants/default-images';
import {
    AddFriendshipButtonRender,
    FollowUserButtonRender,
    DeleteFriendshipButtonRender,
    AcceptFriendshipButtonRender,
    RejectFriendshipButtonRender,
    UnfollowUserButtonRender,
    FriendDropdownRender,
} from '../form_template/buttons-render';
const DetailsView = (props) => {
    const individual = props.individual;
    const friendship = props.friendship;
    const userId = props.userId;
    const individualUserId = props.individualUserId;
    const follows = props.follows;
    console.log('🚀 ~ file: individual-details-view.js ~ line 19 ~ DetailsView ~ follows', friendship);
    const infoRender = (label, value) => {
        if (value)
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {value
                            .toString()
                            .split('\n')
                            .map((para, i) => (
                                <p key={i} className="justify-text">
                                    {para}
                                </p>
                            ))}
                    </Col>
                </Row>
            );
        else return <></>;
    };

    const tagsRender = (label, tags) => {
        return (
            <Row>
                <Col md="3">
                    <b>{label}</b>
                </Col>
                <Col md="9">
                    {tags.map((tag, i) => {
                        return (
                            <Badge variant="primary" key={i} className="badge-single">
                                {tag.label}
                            </Badge>
                        );
                    })}
                </Col>
            </Row>
        );
    };

    const addressMaker = (address) => {
        let fullAddress = '';
        if (address) {
            // if (address.street1) fullAddress += address.street1 + ', ';
            // if (address.street2) fullAddress += address.street2 + ', ';
            if (address.code) fullAddress += address.code + '\n';
            if (address.city) fullAddress += address.city + ', ';
            if (address.state) fullAddress += getStateByCountryAndCode(address.country, address.state) + '\n';
            if (address.country) fullAddress += getCountryByCode(address.country);
        }
        return fullAddress;
    };

    if (individual._id && individual.userType === 'individual') {
        console.log('🚀 ~ file: individual-details-view.js ~ line 76 ~ DetailsView ~ individual', individual);
        const basicInfo = individual.basicInfo;
        const involvement = individual.involvement;
        const impactAreas = involvement.impactAreas;
        const skills = basicInfo.skills;
        return (
            <Container>
                <Row>
                    <Col className="right-align" sm="2">
                        <Image
                            className="left-image"
                            src={basicInfo.profilePicture ? basicInfo.profilePicture : defaultIndividualProfilePicture}
                            width="100%"
                            thumbnail
                        />
                        <hr />
                        {props.friendAndFollowFlag && (
                            <>
                                {!friendship._id && (
                                    <AddFriendshipButtonRender
                                        onClick={() => {
                                            props.handleCreateFriendship();
                                        }}
                                    />
                                )}
                                {friendship.status === 'pending' ? (
                                    <>
                                        {friendship.senderId === userId ? (
                                            <DeleteFriendshipButtonRender
                                                onClick={() => {
                                                    props.handleDeleteFriendship(friendship._id);
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <AcceptFriendshipButtonRender
                                                    onClick={() => {
                                                        props.handleAcceptFriendship(friendship._id);
                                                    }}
                                                />
                                                <RejectFriendshipButtonRender
                                                    onClick={() => {
                                                        props.handleRejectFriendship(friendship._id);
                                                    }}
                                                />
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                                {friendship.status === 'accepted' && (
                                    <FriendDropdownRender
                                        handleUnfriendButton={() => {
                                            props.handleDeleteFriendship(friendship._id);
                                        }}
                                        handleUnfollowButton={() => {
                                            props.handleUnfollowUser();
                                        }}
                                        handleFollowButton={() => {
                                            props.handleFollowUser();
                                        }}
                                        follows={follows}
                                    />
                                )}
                            </>
                        )}
                    </Col>
                    <Col sm="9" className="left-border">
                        <h3>{basicInfo.firstName + ' ' + basicInfo.lastName}</h3>
                        {/* {infoRender('Phone', basicInfo.phone)} */}
                        {infoRender('Kids', basicInfo.kids)}
                        {/* {infoRender('Date Of Birth', moment(basicInfo.dateOfBirth).format('LL'))} */}
                        {/* {tagsRender('Race', getRacesByValues(basicInfo.races))} */}
                        {/* {infoRender('Gender', getGenderByValue(basicInfo.gender))} */}
                        {/* {tagsRender('Language Fluency', getLanguagesByValues(basicInfo.languages))} */}
                        <br />
                        {infoRender('Address', addressMaker(basicInfo.address))}
                        <div style={{ height: 25 }} />
                        <hr />
                        <div style={{ height: 25 }} />
                        {infoRender('About Me', involvement.communityInvolvement)}
                        {tagsRender('Impact Area', impactAreas)}
                        {tagsRender('Skill', skills)}
                        <div style={{ height: 25 }} />
                    </Col>
                </Row>
                <div style={{ height: 25 }} />
            </Container>
        );
    } else
        return (
            <Container>
                <h3>No User Found</h3>
            </Container>
        );
};

export default DetailsView;
