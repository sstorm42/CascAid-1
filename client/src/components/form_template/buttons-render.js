import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaThumbsUp, FaLocationArrow } from 'react-icons/fa';
import { RiUserFollowLine } from 'react-icons/ri';
import { FaRegEdit, FaRegTrashAlt, FaArrowCircleDown, FaArrowCircleUp, FaHeart } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { VscMailRead } from 'react-icons/vsc';
import { FiUserCheck, FiUserX } from 'react-icons/fi';
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
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            Go to list
        </Button>
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
