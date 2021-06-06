import React from 'react';
import { Button, Tooltip, OverlayTrigger, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaThumbsUp, FaLocationArrow } from 'react-icons/fa';
import { RiUserFollowLine } from 'react-icons/ri';
import { FaRegEdit, FaRegTrashAlt, FaArrowCircleDown, FaArrowCircleUp, FaHeart, FaHandsHelping } from 'react-icons/fa';
import { BiDetail, BiDotsVertical } from 'react-icons/bi';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscMailRead } from 'react-icons/vsc';
import { FiUserCheck, FiUserMinus, FiUserX, FiUserPlus } from 'react-icons/fi';
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineUser, AiOutlineSend } from 'react-icons/ai';
import { RiUserFollowFill, RiUserUnfollowFill, RiChat2Line } from 'react-icons/ri';
import { BsCardList, BsPaperclip } from 'react-icons/bs';
import { TiThList } from 'react-icons/ti';

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        {props.title ? props.title : 'NA'}
    </Tooltip>
);
export const DetailsButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Details' })}>
            <Button className="actionButton" variant="outline-info" size="sm" {...props}>
                <BiDetail />
            </Button>
        </OverlayTrigger>
    );
};

export const EditButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Edit' })}>
            <Button className="actionButton" variant="outline-dark" size="sm" {...props}>
                <FaRegEdit />
            </Button>
        </OverlayTrigger>
    );
};

export const DeleteButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Delete' })}>
            <Button className="actionButton" variant="outline-danger" size="sm" {...props}>
                <FaRegTrashAlt />
            </Button>
        </OverlayTrigger>
    );
};

export const SaveButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-success" size="sm" {...props}>
            Save
        </Button>
    );
};

export const ListButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: props.title ? props.title : 'List' })}>
            <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
                <TiThList />
            </Button>
        </OverlayTrigger>
    );
};

export const OthersButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-secondary" size="sm" {...props}>
            Save
        </Button>
    );
};

export const CancelButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-warning" size="sm" {...props}>
            Cancel
        </Button>
    );
};

export const CreateButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-success" size="sm" {...props}>
            {props.title}
        </Button>
    );
};

export const SendButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-secondary" size="sm" {...props}>
            Send
        </Button>
    );
};

export const LikeButtonRender = (props) => {
    const toolTipTitle = props.complete ? 'Unlike' : 'Like';
    const className = props.complete ? 'filled-like-btn' : '';
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: toolTipTitle })}>
            <Button className="actionButton" variant="outline-primary" className={className} size="sm" {...props}>
                <FaThumbsUp />
            </Button>
        </OverlayTrigger>
    );
};
export const InterestedButtonRender = (props) => {
    const toolTipTitle = props.complete ? 'Uninterested' : 'Interested';
    const className = props.complete ? 'filled-interest-btn' : '';
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: toolTipTitle })}>
            <Button className="actionButton" variant="outline-secondary" className={className} size="sm" {...props}>
                <FaHeart />
            </Button>
        </OverlayTrigger>
    );
};
export const GoingButtonRender = (props) => {
    const toolTipTitle = props.complete ? 'Not going' : 'Going';
    const className = props.complete ? 'filled-going-btn' : '';
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: toolTipTitle })}>
            <Button className="actionButton" variant="outline-info" className={className} size="sm" {...props}>
                <FaLocationArrow />
            </Button>
        </OverlayTrigger>
    );
};
export const FollowButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <RiUserFollowLine /> Follow
        </Button>
    );
};
export const RemoveButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <RiUserFollowLine /> Follow
        </Button>
    );
};
export const UpArrowButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <FaArrowCircleUp />
        </Button>
    );
};

export const DownArrowButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <FaArrowCircleDown />
        </Button>
    );
};

export const ReadButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Mark as Read' })}>
            <Button className="actionButton" variant="outline-info" size="sm" {...props}>
                <VscMailRead />
            </Button>
        </OverlayTrigger>
    );
};

export const UnreadButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Mark as Unread' })}>
            <Button className="actionButton" variant="outline-info" size="sm" {...props}>
                <IoMailUnreadOutline />
            </Button>
        </OverlayTrigger>
    );
};

export const AcceptButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Accept' })}>
            <Button className="actionButton" variant="success" size="sm" {...props}>
                <FiUserCheck />
            </Button>
        </OverlayTrigger>
    );
};
export const RejectButtonRender = (props) => {
    return (
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip({ title: 'Reject' })}>
            <Button className="actionButton" variant="danger" size="sm" {...props}>
                <FiUserX />
            </Button>
        </OverlayTrigger>
    );
};

export const AddFriendshipButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-primary" className="add-friend-btn" {...props}>
            <AiOutlineUserAdd /> Add Friend
        </Button>
    );
};
export const AcceptFriendshipButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-success" className="add-friend-btn" {...props}>
            <AiOutlineUserAdd /> Accept Friend
        </Button>
    );
};
export const RejectFriendshipButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-danger" className="add-friend-btn" {...props}>
            <AiOutlineUserDelete /> Reject Friend
        </Button>
    );
};
export const DeleteFriendshipButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-primary" className="delete-friend-btn" {...props}>
            <AiOutlineUserDelete /> Cancel Request
        </Button>
    );
};
export const FollowUserButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-info" className="details-follow-btn" {...props}>
            <RiUserFollowFill /> Follow
        </Button>
    );
};
export const UnfollowUserButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-info" className="details-following-btn" {...props}>
            <RiUserFollowFill /> Following
        </Button>
    );
};
export const FriendDropdownRender = (props) => {
    const handleUnfriendButton = props.handleUnfriendButton;
    const handleUnfollowButton = props.handleUnfollowButton;
    const handleFollowButton = props.handleFollowButton;
    const follows = props.follows;
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" size="sm" className="add-friend-btn">
                <FiUserCheck />
                &nbsp; Friends
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={handleUnfriendButton}>
                    <FiUserMinus />
                    &nbsp; Unfriend
                </Dropdown.Item>
                <Dropdown.Divider />
                {follows ? (
                    <Dropdown.Item onClick={handleUnfollowButton}>
                        <FiUserX />
                        &nbsp; Unfollow
                    </Dropdown.Item>
                ) : (
                    <Dropdown.Item onClick={handleFollowButton}>
                        <FiUserPlus />
                        &nbsp; Follow
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const EndorseUserButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-success" className="details-follow-btn" {...props}>
            <FaHandsHelping /> Endorse
        </Button>
    );
};

export const CancelEndorseUserButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-success" className="details-endorsing-btn" {...props}>
            <FaHandsHelping /> Endorsing
        </Button>
    );
};

export const MessageButtonRender = (props) => {
    const buttonTitle = props.title;
    return (
        <Button size="sm" variant="outline-success" {...props}>
            <RiChat2Line /> {buttonTitle}
        </Button>
    );
};
export const SendMessageButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-success" {...props}>
            <AiOutlineSend /> {props.buttonTitle}
        </Button>
    );
};
export const MessageAttachmentButtonRender = (props) => {
    return (
        <Button size="sm" variant="outline-success" {...props}>
            <BsPaperclip /> {props.buttonTitle}
        </Button>
    );
};
export const HiddenFileInputRender = (props) => {
    return (
        <input
            type="file"
            ref={props.hiddenFileInput}
            onChange={(e) => {
                props.handleAttachmentUpload(e);
            }}
            style={{ display: 'none' }}
            multiple={props.multiple ? props.multiple : false}
        />
    );
};

export const OptionButtonRender = (props) => {
    return (
        <></>
        // <DropdownButton size="sm" className="add-friend-btn dropdown-remove-arrow" title={<BiDotsVertical />} variant="light">
        //     <Dropdown.Item size="sm" eventKey="1">
        //         Delete
        //     </Dropdown.Item>
        // </DropdownButton>

        // <Dropdown>
        //     <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm" className="add-friend-btn dropdown-remove-arrow">
        //         <BiDotsVertical />
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu variant="light">
        //         <Dropdown.Item size="sm">Delete Conversation</Dropdown.Item>
        //     </Dropdown.Menu>
        // </Dropdown>
    );
};
