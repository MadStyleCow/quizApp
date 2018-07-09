// Import system components
import React from 'react';

// Import custom components & classes
import AnswerPanel from './answer/AnswerPanel';
import ButtonPanel from './button/ButtonPanel';
import QuestionText from './question/QuestionText';
import QuestionCounter from './question/QuestionCounter';
import Question from './../classes/Question';
import AnswerType from './../const/AnswerType';
import Endpoint from './../const/Endpoint';
import Spinner from './generic/Spinner';

// Import CSS
import './Quiz.css';

// Question container - root container for the questions
export default class Quiz extends React.Component {

	// Constructor
	// This is the primary common element for the quiz part
	constructor(props) {
		// This will be the common shared component for all of the remaining ones
		// Therefore, the state should be here
		// Call the parent constructor
		super(props);

		// Bind methods
		this.handlePreviousClick = this.handlePreviousClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.handleFinishClick = this.handleFinishClick.bind(this);
		this.handleInput = this.handleInput.bind(this);

		// Set the state
		this.state = {
			questionsAvailable: false,
			questions: Array(2).fill(null),
			currentIndex: 0,
			answerValid: false
		};
	}

	// Component handlers
	componentDidMount() {
		// An event handler, called once the component has been inserted into the DOM tree (initialized basically).
		const requestUrl = `${Endpoint}/questions`;
		const requestParams = {
			method: 'GET',
			mode: 'cors'
		};

		// Request data via web-service
		fetch(requestUrl, requestParams)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				// Update the state
				const questions = json.map(x => {
					return new Question(x.id, x.text, x.options);
				})

				this.setState(() => {
					return {
						questionsAvailable: true,
						questions: questions
					}
				})
			}.bind(this));
	}

	// Event handlers
	handlePreviousClick() {
		// Display the next question
		this.setState((previousState) => {
			// Set the next question
			return {
				currentIndex: previousState.currentIndex - 1,
				answerValid: true
			}
		});
	};

	handleNextClick() {
		// Display the next question
		this.setState((previousState) => {
			// Set the next question
			return {
				currentIndex: previousState.currentIndex + 1,
				answerValid: false
			}
		});
	};

	handleFinishClick() {
		// Construct the result object array
		const sessionId = this.props.sessionId;
		const responseObject = {
			results: this.state.questions.map(x => {
				return {
					sessionId: sessionId,
					questionId: x.id,
					answer: x.value
				};
			})
		};	

		// Once clicked - upload the results
		const requestUrl = `${Endpoint}/results/create`;
		const requestParams = {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(responseObject)
		};

		// POST the data
		fetch(requestUrl, requestParams)
			.then(function (response) {
				// Is the response ok?
				if (response.status === 200) {
					// Invoke the success event handler
					this.props.onQuizFinished();
				}			
			}.bind(this));
	};

	handleInput(e, pType) {
		// Make a local copy
		const value = e.target.value;

		// At this point - validate and handle input
		// Except we should be updating the original data, not the link to it
		switch(pType) {
			case AnswerType.INPUT:
				// Simply update the value
				const questions = this.state.questions;

				// Update the specific option
				questions[this.state.currentIndex].value = value;

				this.setState(prevState => ({
					questions: questions,
					answerValid: value.length !== 0 ? true: false
				}));

				break;

			case AnswerType.CHECKBOX:
				// We should allow only one checkbox to be selected at any time
				// Are we checking or unchecking?
				if (e.target.checked) {
					// Simply update the value
					const questions = this.state.questions;

					// Update the specific option
					questions[this.state.currentIndex].value = value;

					this.setState(prevState => ({
						questions: questions,
						answerValid: value.length !== 0 ? true: false
					}));
				}
				else {
					// Simply indicate that the current answer is not valid
					// As none are selected
					// TODO: Also, should probably set the value to null
					this.setState({answerValid: false});
				}
				break;

			// Throw an exception if its an unsupported type
			default:
				throw new Error('Unsupported answer type'); 
		}
	}

	// Rendered HTML
	render() {
		// Get state values
		const questionsAvailable = this.state.questionsAvailable;
		const questions = this.state.questions;
		const currentQuestion = this.state.questions[this.state.currentIndex];
		const answerValid = this.state.answerValid;

		// Do we have what we need to render?
		if (!questionsAvailable) {
			// Return some loading indicator
			return (
				<Spinner/>
			);
		}

		// Otherwise render the question cards
		return (
			<div className = "card">

				<div className = "card-header bg-light">
					<span>What is the result of..</span>
					<QuestionCounter currentQuestion = { currentQuestion }
						questions = { questions } />
				</div>

				<div className = "card-body">
					<h5 className = "card-title">
						<QuestionText text = { currentQuestion.text } />
					</h5>

					<AnswerPanel currentQuestion = { currentQuestion }
						value = { currentQuestion.value } 
						onHandleInput = { this.handleInput }/>
					
					<ButtonPanel currentQuestion = { currentQuestion }
						questions = { questions }
						answerValid = { answerValid }
						onPreviousClicked = { this.handlePreviousClick }
						onNextClicked = { this.handleNextClick }
						onFinishClicked = { this.handleFinishClick } />
				</div>
			</div>
		);
	}
}