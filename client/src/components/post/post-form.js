import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import PostImageList from './post-image-list';
import { SelectRender, InputRender, InputRenderWithLargeLabel, DateTimePickerRender, TextRender, CheckBoxRender, CreatableMultiSelectRender } from '../form_template/input-render';
import PostGeoCoding from './post-geo-coding';
import { getPostTypeByValue, postTypeFields } from '../../constants/post-types';
import RequiredItemList from './required-item-list';
const PostForm = (props) => {
    console.log(props);
    const allImpactAreas = props.allImpactAreas;
    const allSkills = props.allSkills;
    const images = props.images;
    const requiredItems = props.requiredItems;
    const editMode = props.editMode;
    const postType = props.postType;
    const postTypeLabel = getPostTypeByValue(postType)[0].label;
    const fields = postTypeFields[postType];
    return (
        <Container>
            <Row>
                <Col sm="1"></Col>
                <Col className="parent-page">
                    <form onSubmit={props.handleOnSubmit}>
                        <Row>
                            <Col>{editMode ? <h4>Edit {postTypeLabel}</h4> : <h4>Create {postTypeLabel}</h4>}</Col>

                            <Col className="right-align">
                                <Button
                                    size="sm"
                                    variant="outline-primary"
                                    onClick={() => {
                                        props.handleGoToManagePosts();
                                    }}
                                >
                                    Manage Posts
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        {fields.title && <Field name="title" type="text" component={InputRender} label="Title" placeholder="Title..." />}
                        {fields.startDateTime && <Field name="startDateTime" component={DateTimePickerRender} label="Start time" col1={4} col2={8} zIndex={6001} />}
                        {fields.endDateTime && <Field name="endDateTime" component={DateTimePickerRender} label="End time" col1={4} col2={8} zIndex={6000} />}
                        {fields.description && <Field name="description" type="text" component={TextRender} label="Description" placeholder="Description..." col1={4} col2={8} />}
                        {fields.skills && <Field name="skills" component={CreatableMultiSelectRender} label="Skill" col1={4} col2={8} options={allSkills} zIndex={5000} menuPlacement="top" />}
                        {fields.keywords && (
                            <Field name="keywords" type="text" component={CreatableMultiSelectRender} label="Keywords" col1={4} col2={8} placeholder="Add new keywords" zIndex={2000} />
                        )}
                        {fields.petitionLink && <Field name="petitionLink" type="text" component={InputRender} label="Petition Link" placeholder="" />}
                        {fields.impactAreas && (
                            <>
                                <Row>
                                    <Col sm={4}></Col>
                                    <Col sm={8}>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={() => {
                                                props.handleAddMineImpactAreas();
                                            }}
                                        >
                                            Auto select my impact areas
                                        </Button>
                                    </Col>
                                </Row>
                                <Field name="impactAreas" component={CreatableMultiSelectRender} label="Impact areas" col1={4} col2={8} options={allImpactAreas} zIndex={4000} menuPlacement="top" />
                            </>
                        )}
                        {fields.expectedRequiredHours && (
                            <Field name="expectedRequiredHours" component={InputRenderWithLargeLabel} type="number" unit="Hours" label="Expected Required Time" min={0} max={100} step={0.25} />
                        )}
                        {fields.topNeed && <Field name="topNeed" type="checkbox" component={CheckBoxRender} label="Top Need" col1={4} col2={8} />}
                        {fields.requiredItems && (
                            <>
                                <RequiredItemList
                                    requiredItems={requiredItems}
                                    handleItemEdit={props.handleItemEdit}
                                    handleItemDelete={props.handleItemDelete}
                                    handleItemPosition={props.handleItemPosition}
                                />
                                <Row>
                                    <Col>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                props.handleAddItem();
                                            }}
                                        >
                                            Add New Required Item
                                        </Button>
                                    </Col>
                                    <Col sm="8"></Col>
                                </Row>
                            </>
                        )}
                        {fields.images && (
                            <>
                                <div style={{ height: 50 }} />
                                <PostImageList
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
                            </>
                        )}
                        <br />
                        {fields.address && (
                            <>
                                {/* <Field name="address.fullAddress" type="text" component={InputRender} label="Full Address" placeholder="House, Road, Area, Sector, ZIP, City, State, Country..." /> */}
                                <Row>
                                    <Col sm={4}>Location</Col>
                                    <Col sm={8}>
                                        <PostGeoCoding selectedLocation={props.location} handleLocationChange={props.setLocation} />
                                    </Col>
                                </Row>
                            </>
                        )}
                        {/* {fields.isActive && <Field name="isActive" type="checkbox" component={CheckBoxRender} label="Publish/Active" col1={4} col2={8} />} */}
                        <div style={{ height: 50 }} />
                        {/* Buttons */}
                        <Row>
                            <Col>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    type="submit"
                                    onClick={() => {
                                        props.setIsActive(false);
                                    }}
                                >
                                    Save as Draft
                                </Button>
                                &nbsp;
                                <Button variant="primary" size="sm" type="submit">
                                    {editMode ? 'Update and Publish' : 'Save and Publish'}
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
export default PostForm;
