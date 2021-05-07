import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultIndividualProfilePicture } from '../../constants/default-images';
import { AcceptButtonRender, RejectButtonRender, CancelButtonRender, DeleteFriendshipButtonRender } from '../form_template/buttons-render';
const FriendRequestList = (props) => {
    const friendships = props.friendships;
    const userId = props.userId;
    const handleGotoUserDetails = props.handleGotoUserDetails;

    if (friendships && friendships.length > 0) {
        return (
            <>
                <h4>Total {friendships.length} Friend Found</h4>
                <br />
                <CardColumns className="five-columns">
                    {friendships.map((friendship, i) => {
                        let name = '';
                        let profilePicture = defaultIndividualProfilePicture;
                        if (friendship.senderId === userId) {
                            name = friendship.receiverFirstName + ' ' + friendship.receiverLastName;
                            profilePicture = friendship.receiverProfilePicture;
                        } else if (friendship.receiverId === userId) {
                            name = friendship.senderFirstName + ' ' + friendship.senderLastName;
                            profilePicture = friendship.senderProfilePicture;
                        }
                        return (
                            <Card>
                                <Card.Img variant="top" src={profilePicture} />
                                <Card.Body className="justify-text">
                                    <Card.Title>{name}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    {friendship.senderId === userId && <DeleteFriendshipButtonRender />}
                                    {friendship.receiverId === userId && (
                                        <>
                                            <AcceptButtonRender />
                                            &nbsp;
                                            <RejectButtonRender />
                                        </>
                                    )}
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else return <h4>No Request Found</h4>;
};
export default FriendRequestList;
