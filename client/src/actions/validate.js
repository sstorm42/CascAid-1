import React from 'react';
import { isEmail, isNumeric } from 'validator';
import { FormText } from 'reactstrap';

export const required = (value, props) => {
	if (!value || (props.isCheckable && !props.checked)) {
		return <FormText color="danger">This field is required.</FormText>;
	}
};

export const rangeLimit = (lower, upper) => (value, props) => {
	if (value) {
		if (
			parseInt(value) < parseInt(lower) ||
			parseInt(value) > parseInt(upper)
		) {
			return (
				<FormText color="danger">
					Range exceeded. Range is {lower} to {upper}
				</FormText>
			);
		}
	}
};

export const numeric = (value, props) => {
	if (value) {
		if (value || (props.isCheckable && !props.checked)) {
			if (!isNumeric(value.toString())) {
				return (
					<FormText color="danger">
						<b>{value}</b> is not a numeric value.
					</FormText>
				);
			}
		}
	}
};
export const alphabetic = (value, props) => {
	if (value) {
		if (value || (props.isCheckable && !props.checked)) {
			if (!value.match(/^[A-Za-z\s]+$/)) {
				return (
					<FormText color="danger">
						Use only alphabetic characters.
					</FormText>
				);
			}
		}
	}
};
export const phoneNumber = (value, props) => {
	if (value) {
		if (value || (props.isCheckable && !props.checked)) {
			if (!value.match(/^[0-9\-().\s]{6,15}$/)) {
				return (
					<FormText color="danger">Invalid phone number.</FormText>
				);
			}
		}
	}
};
export const stringLimit = (limit) => (value, props) => {
	if (value) {
		if (value.length > 0 && value.length > limit)
			return (
				<FormText color="danger">
					Limit of characters (max {limit}) exceeded.
				</FormText>
			);
	}
};
export const stringLengthRange = (lower, upper) => (value, props) => {
	if (value) {
		if (value.length > 0 && value.length > upper)
			return (
				<FormText color="danger">
					Limit of characters (max {upper}) exceeded.
				</FormText>
			);
		else if (value.length > 0 && value.length < lower)
			return (
				<FormText color="danger">
					Enter minimum ({lower}) characters.
				</FormText>
			);
	}
};
export const email = (value) => {
	if (value) {
		if (!isEmail(value)) {
			return (
				<FormText color="danger">
					'{value}' is not a valid email.
				</FormText>
			);
		}
	}
};
export const stringLowerLimit = (limit) => (value, props) => {
	if (value.length < limit)
		return (
			<FormText color="danger">
				Minimum {limit} characters required.{' '}
			</FormText>
		);
};
export const validate = (values) => {
	const errors = {};
	if (!values.confirmPassword) {
		errors.confirmPassword = (
			<FormText color="danger">This field is required.</FormText>
		);
	} else if (values.confirmPassword !== values.password) {
		errors.confirmPassword = (
			<FormText color="danger">
				Password and confirm password mismatched.
			</FormText>
		);
	}

	return errors;
};

export const requiredSelect = (value, props) => {
	if (!value || value === '0' || (props.isCheckable && !props.checked)) {
		return <FormText color="danger">This field is required.</FormText>;
	}
};
