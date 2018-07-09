// Import system components
import React, { Component } from 'react';

// Import custom components
import Quiz from './components/Quiz';
import Results from './components/Results';

// Import CSS
import './App.css';

// Primary class for the application
class App extends Component {
	// Constructor
	constructor(props) {
		// Call parent constructor
		super(props);

		// Define a state
		this.state = {
			sessionId: null,
			quizInProgress: true
		};

		// Bind methods
		this.onQuizFinished = this.onQuizFinished.bind(this);
	};

	// System event handlers
	componentDidMount() {
		// Set the initial id
		this.setState({sessionId: this.getUniqueId()});
	};

	// Event handlers
	onQuizFinished() {
		// Update the state
		this.setState({quizInProgress: false});
	}

	// Helpers
	getUniqueId() {
		// Is not guaranteed to be unique, but has a very high probability
		return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
	};

	// Rendering
	render() {
		// What page are we displaying?
		const page = this.state.quizInProgress ? 
			(<Quiz sessionId = {this.state.sessionId} onQuizFinished = { this.onQuizFinished } />) :
			(<Results sessionId = {this.state.sessionId} />);

		return (
			<div className="container">
				{ page }
			</div>
		);
	}
}

export default App;

