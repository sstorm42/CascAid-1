import React from 'react';
import { Button } from 'react-bootstrap';
import { FaThumbsUp, FaLocationArrow } from 'react-icons/fa';
import { RiUserFollowLine } from 'react-icons/ri';
import { FaRegEdit, FaRegTrashAlt, FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { BiDetail } from 'react-icons/bi';
export const DetailsButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-info" size="sm" {...props}>
            <BiDetail />
        </Button>
    );
};

export const EditButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-dark" size="sm" {...props}>
            <FaRegEdit />
        </Button>
    );
};

export const DeleteButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-danger" size="sm" {...props}>
            <FaRegTrashAlt />
        </Button>
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
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <FaThumbsUp /> Like
        </Button>
    );
};
export const GoingButtonRender = (props) => {
    return (
        <Button className="actionButton" variant="outline-primary" size="sm" {...props}>
            <FaLocationArrow /> Going
        </Button>
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
