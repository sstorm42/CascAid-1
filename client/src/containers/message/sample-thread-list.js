import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
const ThreadList = (props) => {
    const allConversations = props.allConversations;
    console.log('🚀 ~ file: sample-thread-list.js ~ line 6 ~ ThreadList ~ allConversations', allConversations);
    return (
        <div className="thread-list">
            <ListGroup as="ul">
                <br />
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Search Name" />
                    </Col>
                </Row>
                <hr />
                {allConversations.map((conversation, i) => {
                    return (
                        <ListGroup.Item key={i}>
                            {/* <Avatar round size="32" name={person.name} />
                            <b> {person.name}</b>
                            <br /> */}
                            <small>last Active: April 10, 2021</small>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ThreadList;
