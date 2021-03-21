import React from 'react';
import { Row, Col, Badge, Image, Table } from 'react-bootstrap';
import { FiExternalLink } from 'react-icons/fi';
import { CheckIconRender, CrossIconRender } from './icon-render';
import moment from 'moment';
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
    if (label && tags && tags.length > 0) {
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

export const ImpactAreasRender = (label, areas) => {
    if (label && areas && areas.length > 0) {
        return (
            <Row>
                {label && (
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                )}
                <Col md="9">
                    {areas.map((area, i) => {
                        if (area)
                            return (
                                <Badge variant="primary" key={i} className={'badge-single'}>
                                    {area.label}
                                </Badge>
                            );
                        else return <></>;
                    })}
                </Col>
            </Row>
        );
    }
    if (areas && areas.length > 0) {
        return (
            <Row>
                <Col md="12">
                    {areas.map((area, i) => {
                        if (area)
                            return (
                                <Badge variant="primary" key={i} className="impact-area-badge  badge-single-small">
                                    {area.label}
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
export const LinkRender = (label, link) => {
    if (label && link) {
        return (
            <Row>
                <Col sm="3">
                    <b>{label}</b>
                </Col>
                <Col sm="9">
                    <a href={link} className="btn-outline-primary btn btn-sm" target="_blank">
                        <FiExternalLink />
                    </a>
                </Col>
            </Row>
        );
    } else if (link) {
        return (
            <Row>
                <Col sm="12">
                    <a href={link} target="_blank">
                        <FiExternalLink />
                    </a>
                </Col>
            </Row>
        );
    } else return <></>;
};

export const BooleanRender = (label, value) => {
    if (label && value) {
        return (
            <Row>
                <Col sm="3">
                    <b>{label}</b>
                </Col>
                <Col sm="9">{value ? <CheckIconRender /> : <CrossIconRender />}</Col>
            </Row>
        );
    } else if (value) {
        return (
            <Row>
                <Col sm="12">{value ? <CheckIconRender /> : <CrossIconRender />}</Col>
            </Row>
        );
    } else return <></>;
};
export const RequiredItemsRender = (items) => {
    if (items && items.length > 0) {
        return (
            <>
                <h6>Required Items</h6>
                <Table striped bordered>
                    <thead variant="dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Requirement</th>
                            <th>Needed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.requirement}</td>
                                    <td>{moment(item.neededBy).format('LLLL')}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    } else return <label>No required items found!</label>;
};
export const KeywordsRender = (label, keywords) => {
    return (
        <Row>
            <Col md="3">
                <b>{label}</b>
            </Col>
            <Col md="9">
                {keywords.map((key, i) => {
                    return (
                        <Badge variant="primary" key={i} className="badge-single">
                            {key}
                        </Badge>
                    );
                })}
            </Col>
        </Row>
    );
};
