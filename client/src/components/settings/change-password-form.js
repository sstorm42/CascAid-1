import React from 'react';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';
import { InputRender } from '../form_template/input-render';
import { required, stringLengthRange } from '@Actions/validate';

const stringRange6To100 = stringLengthRange(6, 100);

const ChangePasswordForm = (props) => {
    return (
        <>
            <Row>
                <Col sm={8}>
                    <h4>Change Password</h4>
                </Col>
            </Row>
            <br />
            {props.userLoggedIn && (
                <Field name="oldPassword" type="password" component={InputRender} label="Old Password" validate={[required, stringRange6To100]} />
            )}
            <Field name="password" type="password" component={InputRender} label="New Password" validate={[required, stringRange6To100]} />

            <Field name="confirmPassword" type="password" component={InputRender} label="Confirm Password" validate={[required, stringRange6To100]} />
        </>
    );
};
export default ChangePasswordForm;
