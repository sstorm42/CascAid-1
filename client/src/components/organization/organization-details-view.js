import React from 'react';
import { Container, Image, Row, Col, Badge } from 'react-bootstrap';
import moment from 'moment';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { getOrganizationTypeByValue } from '../../constants/organization-types';
const DetailsView = (props) => {
    const organization = props.organization;
    const infoRender = (label, value) => {
        return (
            <Row>
                <Col md="4">
                    <b>{label}</b>
                </Col>
                <Col md="8">{value}</Col>
            </Row>
        );
    };
    const organizationTypeRender = (types) => {
        console.log(types);
        return (
            <Row>
                <Col md="4">
                    <b>Organization Type</b>
                </Col>
                <Col md="8">
                    {types.map((type, i) => {
                        return (
                            <Badge variant="primary" key={i} className="badge-single">
                                {getOrganizationTypeByValue(type)}
                            </Badge>
                        );
                    })}
                </Col>
            </Row>
        );
    };
    const keywordsRender = (label, keywords) => {
        return (
            <Row>
                <Col md="4">
                    <b>{label}</b>
                </Col>
                <Col md="8">
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
    const tagsRender = (label, tags) => {
        return (
            <Row>
                <Col md="4">
                    <b>{label}</b>
                </Col>
                <Col md="8">
                    {tags.map((tag, i) => {
                        return (
                            <Badge variant="primary" key={i} className="badge-single">
                                {tag.label}
                            </Badge>
                        );
                    })}
                </Col>
            </Row>
        );
    };
    const addressMaker = (address) => {
        let fullAddress = '';
        if (address) {
            if (address.street1) fullAddress += address.street1 + ', ';
            if (address.street2) fullAddress += address.street2 + ', ';
            if (address.city) fullAddress += address.city + ', ';
            if (address.code) fullAddress += address.code + ', ';
            if (address.state) fullAddress += getStateByCountryAndCode(address.country, address.state) + ', ';
            if (address.country) fullAddress += getCountryByCode(address.country);
        }
        return fullAddress;
    };
    if (organization._id) {
        const basicInfo = organization.basicInfo;
        const serviceInfo = organization.serviceInfo;
        const impactAreas = serviceInfo.impactAreas;
        console.log('🚀 ~ file: organization-details-view.js ~ line 29 ~ DetailsView ~ involvement', organization);
        return (
            <Container>
                <Row>
                    <Col className="right-align" sm="2">
                        <Image className="left-image" src={basicInfo.profilePicture} width="100%" thumbnail />
                    </Col>
                    <Col sm="9" className="left-border">
                        <h3>{basicInfo.name}</h3>
                        {infoRender('Phone', basicInfo.phone)}
                        {infoRender('EIN', basicInfo.ein)}
                        {infoRender('Contact Email', basicInfo.contactEmail)}
                        {infoRender('Website', basicInfo.website)}
                        {organizationTypeRender(basicInfo.organizationType)}
                        {infoRender('Address', addressMaker(basicInfo.address))}
                        {infoRender('Description', basicInfo.description)}
                        {infoRender('Mission', basicInfo.mission)}
                        <div style={{ height: 25 }} />
                        <hr />
                        <div style={{ height: 25 }} />
                        {keywordsRender('Service Areas', serviceInfo.serviceAreas)}
                        {tagsRender('Impact Area', impactAreas)}
                        {keywordsRender('Keywords', serviceInfo.keywords)}
                        <div style={{ height: 25 }} />
                    </Col>
                </Row>
                <div style={{ height: 25 }} />
            </Container>
        );
    } else
        return (
            <Container>
                <h3>No User Found</h3>
            </Container>
        );
};

export default DetailsView;
