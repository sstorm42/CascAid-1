import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import EventImageList from './event-image-list';
import { SelectRender, InputRender, DateTimePickerRender, TextRender, MultiSelectRender } from '../form_template/input-render';
const EventForm = (props) => {
    console.log(props);
    const allImpactAreas = props.allImpactAreas;
    const images = props.images;
    const editMode = props.editMode;

    return (
        <Container>
            <Row>
                <Col sm="1"></Col>
                <Col className="parent-page">
                    <form onSubmit={props.handleOnSubmit}>
                        <Row>
                            <Col>{editMode ? <h4>Edit Event</h4> : <h4>Create Event</h4>}</Col>

                            <Col className="right-align">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        props.handleGoToManageEvents();
                                    }}
                                >
                                    Manage Events
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Field name="title" type="text" component={InputRender} label="Event Title" placeholder="Your event title..." />
                        <Field name="description" type="text" component={TextRender} label="Event Description" placeholder="Your event description..." col1={4} col2={8} />
                        {/* Impact Areas */}
                        <Field name="impactAreas" component={MultiSelectRender} label="Impact area" col1={4} col2={8} options={allImpactAreas} zIndex={4000} menuPlacement="top" />
                        {/* StartDateTime */}
                        <Field name="startDateTime" component={DateTimePickerRender} label="Event start time" col1={4} col2={8} zIndex={3001} />

                        {/* EndDateTime */}
                        <Field name="endDateTime" component={DateTimePickerRender} label="Event end time" col1={4} col2={8} zIndex={2000} />
                        {/* Images */}
                        <div style={{ height: 50 }} />
                        <EventImageList
                            images={images}
                            handleImageDescriptionEdit={props.handleImageDescriptionEdit}
                            handleImageDelete={props.handleImageDelete}
                            handleImagePosition={props.handleImagePosition}
                        />
                        {/* Upload Image */}
                        <Row>
                            <Col>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={props.handlePictureUpload} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                        Choose profile picture
                                    </label>
                                </div>
                            </Col>
                            <Col sm="8"></Col>
                        </Row>
                        {/* Location */}

                        <br />
                        <div style={{ height: 50 }} />
                        {/* Buttons */}
                        <Row>
                            <Col>
                                <Button className="primary" size="sm" type="submit">
                                    {editMode ? 'Update' : 'Save'}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col sm="1"></Col>
            </Row>
        </Container>
    );
};
export default EventForm;
