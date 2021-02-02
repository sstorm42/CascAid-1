import React from 'react';
const LoadingAnim = (props) => {
	return (
		<div className="loadingAnim">
			<div className="lds-ripple">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingAnim;
