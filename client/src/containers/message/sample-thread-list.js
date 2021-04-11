import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Avatar from 'react-avatar';
const ThreadList = (props) => {
    const list = [
        {
            id: 1,
            name: 'Mst Sadia Sultana',
            active: true,
            profilePicture: 'http://localhost:3001/uploaded-images/person1.jpg',
        },
        {
            id: 2,
            name: 'Abdullah al noman',
            profilePicture: 'http://localhost:3001/uploaded-images/person2.jpg',
        },
        {
            id: 3,
            name: 'Abu moin',
            profilePicture: 'http://localhost:3001/uploaded-images/person3.jpg',
        },
        {
            id: 4,
            name: 'Israt Sharera',
            profilePicture: 'http://localhost:3001/uploaded-images/person4.jpg',
        },
        {
            id: 5,
            name: 'Sharmin Akter',
            profilePicture: 'http://localhost:3001/uploaded-images/person5.jpg',
        },
        {
            id: 6,
            name: 'Krittika Singh',
            profilePicture: 'http://localhost:3001/uploaded-images/person6.jpg',
        },
        {
            id: 7,
            name: 'Debashish Haldar',
            profilePicture: 'http://localhost:3001/uploaded-images/person7.jpg',
        },
        {
            id: 8,
            name: 'Subrato Sarker',
            profilePicture: 'http://localhost:3001/uploaded-images/person8.jpg',
        },
    ];
    return (
        <div className="thread-list">
            <ListGroup as="ul">
                <br />
                <input type="text" className="form-control" placeholder="Search Name" />
                <hr />
                {list.map((person, i) => {
                    return (
                        <ListGroup.Item active={person.active} key={i}>
                            <Avatar round size="32" name={person.name} />
                            <b> {person.name}</b>
                            <br />
                            <small>last Active: April 10, 2021</small>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ThreadList;
