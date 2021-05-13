import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
const PostFilter = (props) => {
    const filters = props.filters;
    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Show Only Top Need"
                            checked={filters.topNeed}
                            onChange={() => {
                                props.handleSetFilter('topNeed', !filters.topNeed);
                            }}
                        />
                    </Form.Group>
                </Form>

                <hr />
            </Col>
        </Row>
    );
};
export default PostFilter;
