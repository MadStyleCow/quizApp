// Import system components
import React from 'react';

// Import CSS
import './Spinner.css';

// A generic loading indicator
export default class Spinner extends React.Component {

	// Render
	render() {
		return (
			<div className = "spinner">
				<span className = "text">Loading...</span>
			</div>
		);
	}
}