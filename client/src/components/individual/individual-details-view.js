import React from 'react';
import { Container, Image, Row, Col, Badge } from 'react-bootstrap';
import moment from 'moment';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
const DetailsView = (props) => {
    const individual = props.individual;
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
    const impactAreaRender = (impactAreas) => {
        return (
            <Row>
                <Col md="4">
                    <b>Impact Areas</b>
                </Col>
                <Col md="8">
                    {impactAreas.map((area, i) => {
                        console.log(area.label);
                        return (
                            <Badge variant="primary" key={i} className="badge-single">
                                {area.label}
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
    if (individual._id) {
        const basicInfo = individual.basicInfo;
        const involvement = individual.involvement;
        const impactAreas = involvement.impactAreas;
        console.log('🚀 ~ file: individual-details-view.js ~ line 29 ~ DetailsView ~ involvement', individual);
        return (
            <Container>
                <Row>
                    <Col className="right-align" sm="2">
                        <Image className="left-image" src={basicInfo.profilePicture} width="100%" thumbnail />
                    </Col>
                    <Col sm="9" className="left-border">
                        <h3>{basicInfo.firstName + ' ' + basicInfo.lastName}</h3>
                        {infoRender('Phone', basicInfo.phone)}
                        {infoRender('Kids', basicInfo.kids)}
                        {infoRender('Date Of Birth', moment(basicInfo.dateOfBirth).format('LL'))}
                        {infoRender('Race', basicInfo.race)}
                        {infoRender('Gender', basicInfo.gender)}
                        {infoRender('Language Fluency', basicInfo.languages)}
                        {infoRender('Address', addressMaker(basicInfo.address))}
                        <div style={{ height: 25 }} />
                        <hr />
                        <div style={{ height: 25 }} />
                        {infoRender('Community Involvement', involvement.communityInvolvement)}
                        {impactAreaRender(impactAreas)}

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
