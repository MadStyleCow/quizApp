// Import system components
import React from 'react';

// Import custom components & classes
import Question from './../classes/Question';
import Result from './result/Result';
import ResultPercentage from './result/ResultPercentage';
import Endpoint from './../const/Endpoint';

// Import CSS
import './Quiz.css';

export default class Quiz extends React.Component {

	// Constructor
	constructor(props) {
		// Run constructor
		super(props);

		// Set state
		this.state = {
			results: new Array(2).fill(null),
			resultsAvailable: false
		};
	}

	// Component handlers
	componentDidMount() {
		// An event handler, called once the component has been inserted into the DOM tree (initialized basically).
		// Get session id
		const sessionId = this.props.sessionId;

		// Retrieve question and results data via web-service
		const urlArray = [
			`${Endpoint}/questions`,
			`${Endpoint}/results?sessionId=${sessionId}`
		];
		const requestParams = {
			method: 'GET',
			mode: 'cors'
		};
		
		// Create a list of promises
		const promises = urlArray.map(url => fetch(url, requestParams)
			.then(x => x.json()));

		// Await for results
		Promise.all(promises)
			.then(function(data) {
				// Get the values
				const questions = data[0];
				const results = data[1];

				// Map them
				const compoundObjectArray = questions.map(x => {
					// Find the corresponding results entry
					const resultEntry = results.find(y => parseInt(y.questionId, 10) === x.id);

					return {
						question: new Question(x.id, x.text, x.options ? x.options : null),
						result: {
							value: resultEntry.answer,
							correctValue: x.correctValue
						}
					}
				});

				// Set the state
				this.setState({
					resultsAvailable: true,
					results: compoundObjectArray
				});
		}.bind(this));
	}

	// Rendering
	render() {
		// Get state
		const resultsAvailable = this.state.resultsAvailable;
		const rawResults = this.state.results;

		// Do we have what we need to render?
		if (!resultsAvailable) {
			// Return some loading indicator
			return (
				<div>Loading..</div>
			);
		}

		// Prepare to render
		const results = rawResults.map(x => {
			return (<Result key = { x.question.id }
				question = { x.question }
				value = { x.result.value }
				correctValue = { x.result.correctValue } />);
		});

		return (
			<div className = "results">		
				<h5>Your results are</h5>
				<table className = "table">
					<thead className = "thead-dark">
						<tr>
							<th>#</th>
							<th>Question</th>
							<th>Correct answer</th>
							<th>Your answer</th>
						</tr>
					</thead>
					<tbody>{results}</tbody>
					<tfoot>
						<ResultPercentage results = { rawResults }/>
					</tfoot>
				</table>
			</div>
		);
	}
}