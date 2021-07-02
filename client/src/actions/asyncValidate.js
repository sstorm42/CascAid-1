import React from 'react';
import * as APIPaths from '@Constants/api-paths';
import axios from 'axios';
import { FormText } from 'reactstrap';

const asyncValidate = (value, dispatch, props, field) => {
    let queryString = '';
    if (value._id) {
        queryString += `?currentUserId=${value._id}`;
    }
    return axios
        .get(APIPaths.checkEmailExist + value.email + queryString)
        .then((response) => {
            if (response.data.emailExists) {
                let err = {
                    email: <FormText color="danger">This Email is already used.</FormText>,
                };
                throw err;
            } else {
                let err = {};
                return err;
            }
        })
        .catch((err) => {
            if (err.email) throw err;
            if (err.response.data.emailExists) {
                let err = {
                    email: <FormText color="danger">This Email is already used.</FormText>,
                };
                throw err;
            } else {
                let err = {};
                return err;
            }
        });
};

export default asyncValidate;
