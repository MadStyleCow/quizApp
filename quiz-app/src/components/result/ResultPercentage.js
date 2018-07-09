// Import system components
import React from 'react';

// Question container - root container for the questions
export default class ResultPercentage extends React.Component {

	// Helpers
	calculatePercentage(pCorrectCount, pTotalCount) {
		// Calculate the percentage of correct responses
		return Math.round((pCorrectCount / pTotalCount) * 100);
	};

	calculateCorrectCount(pResults) {
		// Calculate the amount of correct answers
		let correctCount = 0;

		pResults.forEach(x => {
			if (x.result.value.toLowerCase() == x.result.correctValue.toLowerCase()) {
				correctCount++;
			}
		});

		return correctCount;
	};

	// Render
	render() {
		// Get data
		const totalCount = this.props.results.length;
		const correctCount = this.calculateCorrectCount(this.props.results);
		const percentage = this.calculatePercentage(correctCount, totalCount);

		// Render
		return (
			<tr>
				<td colSpan = "4">
					{ `You have correctly answered ${correctCount} out of ${totalCount} questions (${percentage}%)` }
				</td>
			</tr>
		);
	}
}