import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultVolunteeringPicture } from '../../constants/default-images';
import moment from 'moment';
const VolunteeringListView = (props) => {
    const allVolunteerings = props.allVolunteerings;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allVolunteerings && allVolunteerings.length > 0) {
        return (
            <CardColumns md="6">
                {allVolunteerings.map((volunteering, i) => {
                    if (volunteering && volunteering._id) {
                        return (
                            <Card
                                className="special-btn special-card"
                                key={i}
                                onClick={() => {
                                    props.gotoVolunteeringDetails(volunteering._id);
                                }}
                            >
                                <Card.Img variant="top" src={volunteering.defaultImage ? volunteering.defaultImage : defaultVolunteeringPicture} alt="No Image Found" />
                                <Card.Body>
                                    <Card.Title className="center-aligned">{volunteering.title}</Card.Title>
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(volunteering.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small>On {moment(volunteering.startDateTime).format('LL')}</small>
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Volunteerings Found</h4>;
};
export default VolunteeringListView;
