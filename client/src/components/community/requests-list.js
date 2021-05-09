import React from 'react';
import { Card, CardColumns, Button } from 'react-bootstrap';
import { defaultIndividualProfilePicture } from '../../constants/default-images';
import { AcceptButtonRender, RejectButtonRender, DeleteFriendshipButtonRender } from '../form_template/buttons-render';
import { CSSTransition } from 'react-transition-group';
const FriendRequestList = (props) => {
    const friendships = props.friendships;
    const userId = props.userId;
    const cards = props.cards;
    const handleGotoUserDetails = props.handleGotoUserDetails;
    const handleAcceptFriendship = props.handleAcceptFriendship;
    const handleRejectFriendship = props.handleRejectFriendship;
    const handleDeleteFriendship = props.handleDeleteFriendship;
    if (friendships && friendships.length > 0) {
        return (
            <>
                {/* <h4>Total {friendships.length} Request Found</h4> */}
                <br />
                <CardColumns className="five-columns">
                    {friendships.map((friendship, i) => {
                        let name = '';
                        let profilePicture = defaultIndividualProfilePicture;
                        let friendId = '';
                        if (friendship.senderId === userId) {
                            name = friendship.receiverFirstName + ' ' + friendship.receiverLastName;
                            profilePicture = friendship.receiverProfilePicture;
                            friendId = friendship.receiverId;
                        } else if (friendship.receiverId === userId) {
                            name = friendship.senderFirstName + ' ' + friendship.senderLastName;
                            profilePicture = friendship.senderProfilePicture;
                            friendId = friendship.senderId;
                        }
                        return (
                            <CSSTransition
                                in={cards[friendship._id]}
                                timeout={{
                                    enter: 0,
                                    exit: 2000,
                                }}
                                unmountOnExit
                                classNames="my-node"
                                key={i}
                            >
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={profilePicture}
                                        onClick={() => {
                                            handleGotoUserDetails(friendId);
                                        }}
                                    />
                                    <Card.Body
                                        className="justify-text"
                                        onClick={() => {
                                            handleGotoUserDetails(friendId);
                                        }}
                                    >
                                        <Card.Title>{name}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        {friendship.senderId === userId && (
                                            <DeleteFriendshipButtonRender
                                                onClick={() => {
                                                    handleDeleteFriendship(friendship._id);
                                                }}
                                            />
                                        )}
                                        {friendship.receiverId === userId && (
                                            <>
                                                <AcceptButtonRender
                                                    onClick={() => {
                                                        handleAcceptFriendship(friendship._id);
                                                    }}
                                                />
                                                &nbsp;
                                                <RejectButtonRender
                                                    onClick={() => {
                                                        handleRejectFriendship(friendship._id);
                                                    }}
                                                />
                                            </>
                                        )}
                                    </Card.Footer>
                                </Card>
                            </CSSTransition>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else return <h4>No Request Found</h4>;
};
export default FriendRequestList;
