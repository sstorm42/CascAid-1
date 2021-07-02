import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';

const FBLogin = (props) => {
    const componentClicked = (e) => {
        console.log(e);
    };
    const responseFacebook = (e) => {
        console.log(e);
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h4>FACEBOOK LOGIN</h4>
                    <hr />
                    <FacebookLogin appId="808303879820603" autoLoad={true} fields="name,email,picture" onClick={componentClicked} callback={responseFacebook} />
                    <h6>Test commit 1</h6>
                    <h5>Test commit 2</h5>
                    <h4>Test commit 3</h4>
                    <h3>Test commit 4</h3>
                    <h3>Test commit 5</h3>
                </Col>
            </Row>
        </Container>
    );
};
export default FBLogin;
