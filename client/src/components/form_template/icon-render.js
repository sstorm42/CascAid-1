import React from 'react';
import { Row, Col, Badge, Image } from 'react-bootstrap';
import { ImCheckmark, ImCross } from 'react-icons/im';
export const CheckIconRender = () => {
    return (
        <h4>
            <Badge variant="success">
                <ImCheckmark />
            </Badge>
        </h4>
    );
};
export const CrossIconRender = () => {
    return (
        <h4>
            <Badge variant="danger">
                <ImCross />
            </Badge>
        </h4>
    );
};
