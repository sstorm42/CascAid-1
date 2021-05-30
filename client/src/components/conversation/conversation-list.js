import React from 'react';
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { OptionButtonRender } from '../../components/form_template/buttons-render';
const PersonRender = ({ person }) => {
    let name = '';
    let profilePicture = '';
    const basicInfo = person.basicInfo;

    if (person.userType === 'individual') {
        name = basicInfo.firstName + ' ' + basicInfo.lastName;
        profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultIndividualProfilePicture;
    } else if (person.userType === 'organization') {
        name = basicInfo.name;
        profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultOrganizationProfilePicture;
    }
    return (
        <>
            <Avatar round="5px" size="32" src={profilePicture} />
            <b> {name}</b>
            <br />
        </>
    );
};
const ConversationList = (props) => {
    const allConversations = props.allConversations;
    const userId = props.userId;
    const selectedConversationId = props.conversationId;
    return (
        <div className="thread-list">
            <ListGroup as="ul">
                <br />
                <Container>
                    <Row>
                        <Col>
                            {/* <input type="text" className="form-control" placeholder="Search Name" /> */}
                            <h4>All Messages</h4>
                        </Col>
                    </Row>
                </Container>
                {/* <hr /> */}
                {allConversations.map((conversation, i) => {
                    const members = conversation.members;
                    let memberObject = {};
                    for (let i = 0; i < members.length; i++) {
                        memberObject[members[i]._id] = members[i];
                    }
                    let person = {};
                    if (members[0]._id === userId) person = members[1];
                    else if (members[1]._id === userId) person = members[0];
                    let className = 'special-btn conversation-item ';
                    if (selectedConversationId === conversation._id) {
                        className += 'selected-conversation';
                    }
                    return (
                        <ListGroup.Item
                            key={i}
                            className={className}
                            onClick={() => {
                                props.handleGoToConversationDetails(conversation._id);
                            }}
                        >
                            <Row>
                                <Col sm="9">
                                    <PersonRender person={person} />
                                </Col>
                                <Col sm="2">
                                    <OptionButtonRender />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ConversationList;
