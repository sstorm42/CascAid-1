import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import {
    SelectRender,
    InputRender,
    InputRenderWithLargeLabel,
    DateTimePickerRender,
    TextRender,
    CheckBoxRender,
    CreatableMultiSelectRender,
} from '../form_template/input-render';
const CultivationForm = (props) => {
    const editMode = props.editMode;
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col sm={6}>{editMode ? <h4>Edit Cultivation</h4> : <h4>Create Cultivation</h4>}</Col>

                        {/* <Col sm={6} className="right-align">
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                    props.handleGoToManagePosts();
                                }}
                            >
                                Manage Posts
                            </Button>
                        </Col> */}
                    </Row>
                    <form onSubmit={props.handleOnSubmit}>
                        <Field name="title" type="text" component={InputRender} label="Title" placeholder="Title..." />
                        <Field name="description" type="text" component={TextRender} label="Description" placeholder="Description..." col1={4} col2={8} />
                        <Row>
                            <Col sm={4}></Col>
                            <Col sm={8}>
                                {/* <Button
                                    variant="warning"
                                    size="sm"
                                    type="submit"
                                    onClick={() => {
                                        props.setIsActive(false);
                                    }}
                                >
                                    Save as Draft
                                </Button>
                                &nbsp; */}
                                <Button variant="primary" size="sm" type="submit">
                                    {editMode ? 'Update' : 'Save'}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};
export default CultivationForm;
