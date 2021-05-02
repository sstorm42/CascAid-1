import React from 'react';
import { Container, Image, Table, Row, Col, Badge, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { getMembershipStatusByValue, getMembershipByValue } from '../../constants/membership-types';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { defaultOrganizationProfilePicture, defaultIndividualProfilePicture } from '../../constants/default-images';
const TimeRender = (time) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[time.month]}-${time.year}`;
};
const DetailsView = (props) => {
    const organization = props.organization;
    const memberships = props.memberships;
    console.log('🚀 ~ file: organization-details-view.js ~ line 9 ~ DetailsView ~ memberships', memberships);
    const follows = props.follows;
    const infoRender = (label, value) => {
        if (value) {
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {value.split('\n').map((para, i) => (
                            <p key={i} className="justify-text">
                                {para}
                            </p>
                        ))}
                    </Col>
                </Row>
            );
        } else return <></>;
    };

    const keywordsRender = (label, keywords) => {
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
    const tagsRender = (label, tags) => {
        if (tags && tags.length > 0) {
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {tags.map((tag, i) => {
                            if (tag)
                                return (
                                    <Badge variant="primary" key={i} className="badge-single">
                                        {tag.label}
                                    </Badge>
                                );
                        })}
                    </Col>
                </Row>
            );
        } else return <></>;
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
    if (organization._id && organization.userType === 'organization') {
        const basicInfo = organization.basicInfo;
        const serviceInfo = organization.serviceInfo;
        const impactAreas = serviceInfo.impactAreas;
        console.log(basicInfo);
        return (
            <>
                <h3>{basicInfo.name}</h3>
                {tagsRender('Organization Type', basicInfo.organizationTypes)}
                {infoRender('Contact Email', basicInfo.contactEmail)}
                {infoRender('Website', basicInfo.website)}

                {infoRender('Phone', basicInfo.phone)}
                {infoRender('EIN', basicInfo.ein)}
                {infoRender('Address', addressMaker(basicInfo.address))}
                <b>Memberships</b>
                <Table>
                    <thead></thead>
                    <tbody>
                        {memberships.map((membership, i) => {
                            const name = membership.individualFirstName + ' ' + membership.individualLastName;
                            const profilePicture = membership.individualProfilePicture ? membership.individualProfilePicture : defaultIndividualProfilePicture;
                            return (
                                <tr key={i}>
                                    <td>
                                        <Image src={profilePicture} style={{ height: 32, width: 32 }} thumbnail />
                                    </td>
                                    <td>{name}</td>
                                    <td>{getMembershipByValue(membership.membershipType)}</td>
                                    <td>{TimeRender(membership.startTime)}</td>
                                    <td>{membership.isCurrent}</td>
                                    {membership.isCurrent ? (
                                        <td>
                                            <Badge variant="primary">Current Member</Badge>
                                        </td>
                                    ) : (
                                        <td>{TimeRender(membership.endTime)}</td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <hr />
                <div style={{ height: 25 }} />
                {keywordsRender('Service Areas', serviceInfo.serviceAreas)}
                {tagsRender('Impact Area', impactAreas)}
                {keywordsRender('Keywords', serviceInfo.keywords)}
                <div style={{ height: 25 }} />
                <hr />
                {infoRender('Mission', basicInfo.mission)}
                <hr />
                {infoRender('Description', basicInfo.description)}
                <div style={{ height: 25 }} />
            </>
        );
    } else
        return (
            <Container>
                <h3>No User Found</h3>
            </Container>
        );
};

export default DetailsView;
