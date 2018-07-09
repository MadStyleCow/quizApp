// Import system components
import React from 'react';

// Import CSS
import './ButtonPanel.css';

// Question container - root container for the questions
export default class ButtonPanel extends React.Component {

	// Constructor
	constructor(props) {
		// Call parent constructor
		super(props);

		// Bind method
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleFinishClick = this.handleFinishClick.bind(this);
	}

	// Event handlers
	handlePreviousClick(e) {
		// Call the parent event handler
		this.props.onPreviousClicked(e.target);
	};

	handleNextClick(e) {
		// Call the parent event handler
		this.props.onNextClicked(e.target);
	};

	handleFinishClick(e) {
		// Call the parent event handler
		this.props.onFinishClicked(e.target);
	};

	// Render
	render() {
		// Get props
		const questions = this.props.questions;
		const currentQuestion = this.props.currentQuestion;
		const answerValid = this.props.answerValid;

		// Calculate counts
		const currentCount = questions.indexOf(currentQuestion) + 1;
		const totalCount = questions.length;

		// Now, we need to decide what buttons do we show.
		let previousButton = currentCount > 1 ? true : false;
		let nextButton = currentCount < totalCount ? true: false;
		let finishButton = currentCount === totalCount ? true: false;

		return (
			<div className = "buttonPanel">
				{ previousButton ? (
					<button className = "btn btn-secondary" 
						onClick = { this.handlePreviousClick }>
							Previous
					</button>
					) : ('')
				}

				{ nextButton ? (
					<button className = "btn btn-primary" 
						onClick = { this.handleNextClick }					
						disabled = { !answerValid }>
							Next
					</button>
					) : ('')
				}

				{ finishButton ? (
					<button className = "btn btn-primary" 
						onClick = { this.handleFinishClick }
						disabled = { !answerValid }>
							Finish
					</button>
					) : ('')
				}
			</div>
		);
	}
}