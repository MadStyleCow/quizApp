// Import system components
import React from 'react';

// Import custom components & classes
import AnswerType from './../../const/AnswerType';

// Import CSS
import './Result.css';

// Question container - root container for the questions
export default class Result extends React.Component {

	// Helpers
	getValueText(pId) {
		return this.props.question.options.find(x => x.id == pId).text;
	};

	// Render
	render() {
		// Get props
		const question = this.props.question;
		const isCorrect = (this.props.value.toLowerCase() == this.props.correctValue.toLowerCase());

		// Get either the option text or the value
		const selectedValue = question.answerType === AnswerType.CHECKBOX ? 
			this.getValueText(this.props.value) :
			this.props.value;

		const correctValue = question.answerType === AnswerType.CHECKBOX ? 
			this.getValueText(this.props.correctValue) :
			this.props.correctValue;

		// Render
		return (
			<tr className = {isCorrect ? 'success' : 'failure'}>
				<th>{question.id}</th>
				<td className = "text">{question.text}</td>
				<td>{correctValue}</td>
				<td>{selectedValue}</td>
			</tr>
		);
	}
}