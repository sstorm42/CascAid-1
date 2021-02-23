import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
const OrganizationListView = (props) => {
    const allOrganizations = props.allOrganizations;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allOrganizations && allOrganizations.length > 0) {
        return (
            <CardColumns>
                {allOrganizations.map((org, i) => {
                    if (org && org.basicInfo && org.basicInfo.name) {
                        return (
                            <Card
                                key={i}
                                onClick={() => {
                                    props.gotoOrganizationDetails(org.userId);
                                }}
                            >
                                <Card.Img variant="top" src={org.basicInfo.profilePicture ? org.basicInfo.profilePicture : defaultOrganizationProfilePicture} alt="No Image Found" />
                                <Card.Body className="justify-text">
                                    <Card.Title>{org.basicInfo.name}</Card.Title>
                                    <hr />
                                    <Card.Text>
                                        <small>{descriptionRender(org.basicInfo.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                {/* <Card.Footer></Card.Footer> */}
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Organizations Found</h4>;
};
export default OrganizationListView;
