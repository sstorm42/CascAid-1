import React from 'react';
import { Table, Image, Button, Row, Col, Badge } from 'react-bootstrap';
const PostImageList = (props) => {
    const images = props.images;
    if (images && images.length > 0) {
        return (
            <>
                <Row>
                    <Col>
                        <h5>All Images</h5>
                    </Col>
                    <Col className="right-align">
                        <Badge pill variant="dark" className="badge-single ">
                            Remember: First Image of the list will be your default post image
                        </Badge>
                    </Col>
                </Row>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {images.map((image, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ width: 220 }}>
                                        <Image src={image.path} thumbnail width="200" />
                                    </td>
                                    <td>
                                        <textarea
                                            value={image.description}
                                            placeholder="Add description..."
                                            rows="8"
                                            type="text"
                                            className="form-control image-description-input"
                                            onChange={(e) => {
                                                props.handleImageDescriptionEdit(i, e);
                                            }}
                                        />
                                    </td>
                                    <td className="block">
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => {
                                                props.handleImageDelete(i);
                                            }}
                                        >
                                            DELETE
                                        </Button>
                                        <br />
                                        <br />
                                        {i > 0 && (
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => {
                                                    props.handleImagePosition(i, 'up');
                                                }}
                                            >
                                                <Image src="/images/arrow-up-icon.png" thumbnail />
                                            </Button>
                                        )}
                                        <br />
                                        <br />
                                        {i < images.length - 1 && (
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => {
                                                    props.handleImagePosition(i, 'down');
                                                }}
                                            >
                                                <Image src="/images/arrow-down-icon.png" thumbnail />
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
        );
    } else {
        return <h5>No Image Added</h5>;
    }
};
export default PostImageList;
