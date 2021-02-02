import React from 'react';
import { Button } from 'react-bootstrap';
// We will render some types of button.
// 1. Details - info - testing
// 2. Save - success
// 3. Delete - danger
// 4. Edit - warning
// 5. Others. - secondary
export const DetailsButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-info"
			size="sm"
			{...props}
		>
			Details
		</Button>
	);
};

export const EditButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-warning"
			size="sm"
			{...props}
		>
			Edit
		</Button>
	);
};

export const DeleteButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-danger"
			size="sm"
			{...props}
		>
			Delete
		</Button>
	);
};

export const SaveButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-success"
			size="sm"
			{...props}
		>
			Save
		</Button>
	);
};

export const ListButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-primary"
			size="sm"
			{...props}
		>
			Go to list
		</Button>
	);
};

export const OthersButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-secondary"
			size="sm"
			{...props}
		>
			Save
		</Button>
	);
};

export const CancelButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-warning"
			size="sm"
			{...props}
		>
			Cancel
		</Button>
	);
};

export const CreateButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-success"
			size="sm"
			{...props}
		>
			{props.title}
		</Button>
	);
};

export const SendButtonRender = (props) => {
	return (
		<Button
			className="actionButton"
			variant="outline-secondary"
			size="sm"
			{...props}
		>
			Send
		</Button>
	);
};
