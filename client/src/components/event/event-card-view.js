import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultEventPicture } from '../../constants/default-images';
import moment from 'moment';
const EventListView = (props) => {
    const allEvents = props.allEvents;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allEvents && allEvents.length > 0) {
        return (
            <CardColumns md="6">
                {allEvents.map((event, i) => {
                    if (event && event._id) {
                        return (
                            <Card
                                className="special-btn special-card"
                                key={i}
                                onClick={() => {
                                    props.gotoEventDetails(event._id);
                                }}
                            >
                                <Card.Img variant="top" src={event.defaultImage ? event.defaultImage : defaultEventPicture} alt="No Image Found" />
                                <Card.Body>
                                    <Card.Title className="center-aligned">{event.title}</Card.Title>
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(event.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small>On {moment(event.startDateTime).format('LL')}</small>
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Events Found</h4>;
};
export default EventListView;
