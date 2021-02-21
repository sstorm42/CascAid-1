import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
const OrganizationListView = (props) => {
    const allOrganizations = props.allOrganizations;
    if (allOrganizations && allOrganizations.length > 0) {
        return (
            <CardColumns>
                {allOrganizations.map((org, i) => {
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
                                <Card.Text>{org.basicInfo.description}</Card.Text>
                            </Card.Body>
                            {/* <Card.Footer></Card.Footer> */}
                        </Card>
                    );
                })}
            </CardColumns>
        );
    } else return <h4>No Organizations Found</h4>;
};
export default OrganizationListView;
