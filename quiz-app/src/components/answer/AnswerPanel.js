// Import system components
import React from 'react';

// Import custom components & classes
import AnswerCheckbox from './AnswerCheckbox';
import AnswerInput from './AnswerInput';
import AnswerType from './../../const/AnswerType';

export default class AnswerPanel extends React.Component {

	// Constructor
	constructor(props) {
		// Call parent constructor
		super(props);

		// Bind methods
		this.onHandleInput = this.onHandleInput.bind(this);
	}

	// Event handlers
	onHandleInput(e, pType) {
		// Call the parent handler
		this.props.onHandleInput(e, pType);

		// Force update
		this.forceUpdate();
	};

	// Render
	render() {
		// At this point, we need to decide what type of answer form should we show
		const question = this.props.currentQuestion;
		const value = this.props.value;
		let answerType;

		switch (question.answerType) {
			// Its a single input
			case AnswerType.INPUT:
				answerType = <AnswerInput 
					onHandleInput = { this.onHandleInput } 
					value = { question.value } />;
				break;

			// Its a checkbox group
			case AnswerType.CHECKBOX:
				// Add as many checkboxes as we require
				answerType = question.options.map(x => {
					return (<AnswerCheckbox
						key = { x.id }
						option = { x }
						value = { value }
						onHandleInput = { this.onHandleInput } />)
				});
				break;

			// Throw an exception if its an unsupported type
			default:
				throw new Error('Unsupported answer type');
		}

		return (
			<div className = "answerPanel row">{ answerType }</div>
		);
	}
}