import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import VolunteeringImageList from './volunteering-image-list';
import { SelectRender, InputRender, DateTimePickerRender, TextRender, CreatableMultiSelectRender, CheckBoxRender } from '../form_template/input-render';
import VolunteeringGeoCoding from './volunteering-geo-coding';
const VolunteeringForm = (props) => {
    console.log(props);
    const allImpactAreas = props.allImpactAreas;
    const allSkills = props.allSkills;
    const images = props.images;
    const editMode = props.editMode;

    return (
        <Container>
            <Row>
                <Col sm="1"></Col>
                <Col className="parent-page">
                    <form onSubmit={props.handleOnSubmit}>
                        <Row>
                            <Col>{editMode ? <h4>Edit Volunteering</h4> : <h4>Create Volunteering</h4>}</Col>

                            <Col className="right-align">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        props.handleGoToManageVolunteerings();
                                    }}
                                >
                                    Manage Volunteerings
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Field name="title" type="text" component={InputRender} label="Volunteering Title" placeholder="Your volunteering title..." />
                        {/* StartDateTime */}
                        <Field name="startDateTime" component={DateTimePickerRender} label="Volunteering start time" col1={4} col2={8} zIndex={6001} />
                        {/* EndDateTime */}
                        <Field name="endDateTime" component={DateTimePickerRender} label="Volunteering end time" col1={4} col2={8} zIndex={6000} />

                        <Field name="description" type="text" component={TextRender} label="Volunteering Description" placeholder="Your Volunteering description..." col1={4} col2={8} />
                        {/* Skill */}
                        <Field name="skills" component={CreatableMultiSelectRender} label="Skill" col1={4} col2={8} options={allSkills} zIndex={5000} menuPlacement="top" />
                        {/* Impact Areas */}
                        <Field name="impactAreas" component={CreatableMultiSelectRender} label="Impact area" col1={4} col2={8} options={allImpactAreas} zIndex={4000} menuPlacement="top" />
                        <Field name="topNeed" type="checkbox" component={CheckBoxRender} label="Top Need" col1={4} col2={8} />
                        {/* Images */}
                        <div style={{ height: 50 }} />
                        <VolunteeringImageList
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
                        <hr />
                        <Row>
                            <Col sm={4}>Location</Col>
                            <Col sm={8}>
                                <VolunteeringGeoCoding selectedLocation={props.location} handleLocationChange={props.setLocation} />
                            </Col>
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
export default VolunteeringForm;