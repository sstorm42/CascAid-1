import React from 'react';
import { Container, Image, Row, Col, Badge } from 'react-bootstrap';
import moment from 'moment';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { getLanguagesByValues } from '../../constants/languages';
import { getRacesByValues } from '../../constants/races';
import { getGenderByValue } from '../../constants/genders';
import { defaultIndividualProfilePicture } from '../../constants/default-images';
const DetailsView = (props) => {
    const individual = props.individual;
    const infoRender = (label, value) => {
        console.log(label, value);
        if (value)
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {value
                            .toString()
                            .split('\n')
                            .map((para, i) => (
                                <p key={i} className="justify-text">
                                    {para}
                                </p>
                            ))}
                    </Col>
                </Row>
            );
        else return <></>;
    };

    const tagsRender = (label, tags) => {
        console.log('🚀 ~ file: individual-details-view.js ~ line 48 ~ tagsRender ~ tags', tags);
        return (
            <Row>
                <Col md="3">
                    <b>{label}</b>
                </Col>
                <Col md="9">
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
            // if (address.street1) fullAddress += address.street1 + ', ';
            // if (address.street2) fullAddress += address.street2 + ', ';
            if (address.code) fullAddress += address.code + '\n';
            if (address.city) fullAddress += address.city + ', ';
            if (address.state) fullAddress += getStateByCountryAndCode(address.country, address.state) + '\n';
            if (address.country) fullAddress += getCountryByCode(address.country);
        }
        return fullAddress;
    };

    if (individual._id) {
        const basicInfo = individual.basicInfo;
        console.log('🚀 ~ file: individual-details-view.js ~ line 63 ~ DetailsView ~ basicInfo', basicInfo);
        const involvement = individual.involvement;
        const impactAreas = involvement.impactAreas;

        return (
            <Container>
                <Row>
                    <Col className="right-align" sm="2">
                        <Image className="left-image" src={basicInfo.profilePicture ? basicInfo.profilePicture : defaultIndividualProfilePicture} width="100%" thumbnail />
                    </Col>
                    <Col sm="9" className="left-border">
                        <h3>{basicInfo.firstName + ' ' + basicInfo.lastName}</h3>
                        {/* {infoRender('Phone', basicInfo.phone)} */}
                        {infoRender('Kids', basicInfo.kids)}
                        {infoRender('Date Of Birth', moment(basicInfo.dateOfBirth).format('LL'))}
                        {/* {tagsRender('Race', getRacesByValues(basicInfo.races))} */}
                        {/* {infoRender('Gender', getGenderByValue(basicInfo.gender))} */}
                        {tagsRender('Language Fluency', getLanguagesByValues(basicInfo.languages))}
                        <br />
                        {infoRender('Address', addressMaker(basicInfo.address))}
                        <div style={{ height: 25 }} />
                        <hr />
                        <div style={{ height: 25 }} />
                        {infoRender('About Me', involvement.communityInvolvement)}
                        {tagsRender('Impact Area', impactAreas)}

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
