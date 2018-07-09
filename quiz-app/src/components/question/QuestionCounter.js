// Import system components
import React from 'react';

// Import CSS
import './QuestionCounter.css';

// Question container - root container for the questions
export default class QuestionCounter extends React.Component {

	// Render
	render() {
		// Get the counts
		const currentCount = this.props.questions.indexOf(this.props.currentQuestion) + 1;
		const totalCount = this.props.questions.length;

		return (
			<div className = "questionCounter">
				<span>{`Question ${currentCount} of ${totalCount}`}</span>
			</div>
		);
	}
}