import React, { useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { Button, Modal, Row, Col, Container } from 'react-bootstrap';
const ProfilePictureUploader = (props) => {
    const [image, setImage] = useState(props.profilePicture);
    const [scaleValue, setScaleValue] = useState(1);
    const [sliderValue, setSliderValue] = useState(0);
    const [modal, setModal] = useState(false);
    const [editor, setEditor] = useState({});
    const fileChangeHandler = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };
    const handleDrop = (dropped) => {
        setImage(dropped[0]);
    };
    const handleSliderChange = (value) => {
        setScaleValue(3 * (value / 300) + 1);
        setSliderValue(value);
    };
    const onClickSave = () => {
        console.log(image);
        if (editor) {
            console.log('🚀 ~ file: profile-picture-changer.js ~ line 27 ~ onClickSave ~ editor', editor);
            const canvasScaled = editor.getImageScaledToCanvas();
            const imageFile = canvasScaled.toDataURL();
            console.log('🚀 ~ file: profile-picture-changer.js ~ line 30 ~ onClickSave ~ imageFile', imageFile);
            props.setProfilePicture(imageFile);
        }
    };
    const setEditorRef = (editor) => {
        setEditor(editor);
    };
    return (
        <div className="right-align">
            <Button
                type="button"
                variant="outline-primary"
                size="sm"
                onClick={() => {
                    setModal(true);
                }}
            >
                Upload Profile Picture
            </Button>
            <Modal
                className=""
                style={{ zIndex: 10000 }}
                show={modal}
                onHide={() => {
                    setModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={fileChangeHandler} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile02">
                                        Choose profile picture
                                    </label>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        {image && (
                            <Row>
                                <Col>
                                    <AvatarEditor
                                        crossOrigin="anonymous"
                                        ref={setEditorRef}
                                        image={image}
                                        width={400}
                                        height={400}
                                        border={0}
                                        color={[255, 255, 255, 0.6]} // RGBA
                                        scale={scaleValue}
                                        rotate={0}
                                    />
                                </Col>
                            </Row>
                        )}
                        {image && (
                            <Row>
                                <Col>
                                    <Slider value={sliderValue} min={0} max={300} orientation="horizontal" onChange={handleSliderChange} />
                                </Col>
                            </Row>
                        )}
                        <Modal.Footer>
                            {image && (
                                <Row>
                                    <Col>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline-success"
                                            onClick={() => {
                                                setModal(false);
                                                onClickSave(props);
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </Modal.Footer>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default ProfilePictureUploader;
