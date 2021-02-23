import React from 'react';
import { Row, Col, Badge, Image } from 'react-bootstrap';
export const DetailsInfoRowRender = ({ label, value }) => {
    if (value) {
        return (
            <Row className="detailsRow">
                <Col sm={3} className="detailsLabel">
                    <label>{label}</label>
                </Col>

                <Col className="detailsValue">
                    <span>{value}</span>
                </Col>
            </Row>
        );
    } else return <Row />;
};

export const TagWithLabelRender = (label, tags) => {
    if (label && tags.length > 0) {
        return (
            <Row>
                {label && (
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                )}
                <Col md="9">
                    {tags.map((tag, i) => {
                        if (tag)
                            return (
                                <Badge variant="primary" key={i} className={'badge-single'}>
                                    {tag.label}
                                </Badge>
                            );
                        else return <></>;
                    })}
                </Col>
            </Row>
        );
    }
    if (tags && tags.length > 0) {
        return (
            <Row>
                <Col md="12">
                    {tags.map((tag, i) => {
                        if (tag)
                            return (
                                <Badge variant="primary" key={i} className={'badge-single'}>
                                    {tag.label}
                                </Badge>
                            );
                        else return <></>;
                    })}
                </Col>
            </Row>
        );
    } else return <></>;
};

export const DescriptionRender = (label, value) => {
    const valueRender = () => {
        return (
            <>
                {value.split('\n').map((para, i) => {
                    return (
                        <p className="justify-text" key={i}>
                            {para}
                        </p>
                    );
                })}
            </>
        );
    };
    if (label && value) {
        return (
            <Row>
                <Col sm="3">{label}</Col>
                <Col sm="9">{valueRender()}</Col>
            </Row>
        );
    } else if (value) {
        return (
            <Row>
                <Col sm="12">{valueRender()}</Col>
            </Row>
        );
    } else return <></>;
};
export const ImageAndDescriptionRender = (images) => {
    if (images && images.length > 0) {
        return (
            <>
                {images.map((image, i) => {
                    return (
                        <Row key={i} className="image-description-box">
                            <Col sm="3">
                                <Image width="100%" src={image.path} thumbnail />
                            </Col>
                            <Col sm="9">{DescriptionRender('', image.description)}</Col>
                        </Row>
                    );
                })}
            </>
        );
    } else return <></>;
};
export const InfoRender = (label, value) => {
    if (label && value) {
        return (
            <Row>
                <Col sm="3">
                    <b>{label}</b>
                </Col>
                <Col sm="9">{value}</Col>
            </Row>
        );
    } else if (value) {
        return (
            <Row>
                <Col sm="12">{value}</Col>
            </Row>
        );
    } else return <></>;
};
