import React from 'react';
import { Container, Row, Col, Card, CardColumns } from 'react-bootstrap';

const GalleryView = (props) => {
    const setImage = props.setImage;
    const setImageDetailsModal = props.setImageDetailsModal;
    const images = props.images;
    return (
        <CardColumns className="five-columns">
            {images.map((image, i) => {
                if (image.images && image.images.path) {
                    return (
                        <Card
                            className="special-btn"
                            key={i}
                            onClick={() => {
                                setImage(image);
                                setImageDetailsModal(true);
                            }}
                        >
                            <Card.Img src={image.images.path} />
                        </Card>
                    );
                }
                return <></>;
            })}
        </CardColumns>
    );
};
export default GalleryView;
