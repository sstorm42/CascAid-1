import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Field } from 'redux-form';
import PostImageList from './post-image-list';
import { SelectRender, InputRender, DateTimePickerRender, TextRender, CreatableMultiSelectRender } from '../form_template/input-render';
import PostGeoCoding from './post-geo-coding';
const PostForm = (props) => {
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
                            <Col>{editMode ? <h4>Edit Post</h4> : <h4>Create Post</h4>}</Col>

                            <Col className="right-align">
                                <Button
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
                        <Field name="title" type="text" component={InputRender} label="Post Title" placeholder="Your post title..." />
                        <Field name="description" type="text" component={TextRender} label="Post Description" placeholder="Your post description..." col1={4} col2={8} />
                        {/* Impact Areas */}
                        <Field name="impactAreas" component={CreatableMultiSelectRender} label="Impact area" col1={4} col2={8} options={allImpactAreas} zIndex={4000} menuPlacement="top" />

                        {/* Images */}
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
export default PostForm;
