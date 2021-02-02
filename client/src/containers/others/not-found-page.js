import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class PageNotFound extends Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<h3>Are You Lost?</h3>
				<p>
					<Link to="/">Go to Home Page</Link>
				</p>
			</div>
		);
	}
}
export default PageNotFound;
