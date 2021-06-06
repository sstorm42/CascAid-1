import React from 'react';
import { Card, CardColumns, Badge } from 'react-bootstrap';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { MessageButtonRender } from '../form_template/buttons-render';
import { CSSTransition } from 'react-transition-group';
const EndorserList = (props) => {
    const endorsers = props.endorsers;
    const cards = props.cards;
    const userId = props.userId;
    const handleGotoUserDetails = props.handleGotoUserDetails;
    const getUserTypeName = {
        individual: 'INDIVIDUAL',
        organization: 'ORGANIZATION',
    };
    console.log('🚀 ~ file: friends-list.js ~ line 5 ~ SampleOrgList ~ friendships', endorsers);
    if (endorsers && endorsers.length > 0) {
        return (
            <>
                {/* <h4>Total {endorsers.length} Endorser Found</h4> */}
                <br />
                <CardColumns className="five-columns">
                    {endorsers.map((endorser, i) => {
                        let name = '';
                        let profilePicture = '';
                        if (endorser.endorserUserType === 'individual') {
                            name = endorser.endorserFirstName + ' ' + endorser.endorserLastName;
                            profilePicture = endorser.endorserProfilePicture ? endorser.endorserProfilePicture : defaultIndividualProfilePicture;
                        } else if (endorser.endorserUserType === 'organization') {
                            name = endorser.endorserName;
                            profilePicture = endorser.endorserProfilePicture ? endorser.endorserProfilePicture : defaultOrganizationProfilePicture;
                        }
                        return (
                            <CSSTransition
                                in={cards[endorser._id]}
                                timeout={{
                                    enter: 0,
                                    exit: 2000,
                                }}
                                unmountOnExit
                                classNames="my-node"
                                key={i}
                            >
                                <Card>
                                    <div className="home-post-image-dark">
                                        <Card.Img
                                            className="special-btn"
                                            variant="top"
                                            src={profilePicture}
                                            alt="Endorser"
                                            onClick={() => {
                                                props.handleGotoUserDetails(endorser.endorserUserType, endorser.endorserId);
                                            }}
                                        />
                                        <Badge variant="primary" className="image-text-top-left-small">
                                            {getUserTypeName[endorser.endorserUserType]}
                                        </Badge>
                                    </div>
                                    <Card.Body
                                        className="special-btn"
                                        onClick={() => {
                                            props.handleGotoUserDetails(endorser.endorserUserType, endorser.endorserId);
                                        }}
                                    >
                                        <Card.Title>{name}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <MessageButtonRender
                                            title="Message"
                                            onClick={() => {
                                                props.handleOpenMessageModal({ userId: endorser.endorserId, name });
                                            }}
                                        />
                                    </Card.Footer>
                                </Card>
                            </CSSTransition>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else return <h4>No Endorser Found</h4>;
};
export default EndorserList;
