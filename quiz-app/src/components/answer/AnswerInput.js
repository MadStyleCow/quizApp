// Import system components
import React from 'react';

// Import custom classes
import AnswerType from './../../const/AnswerType';

export default class AnswerInput extends React.Component {

	// Constructor
	constructor(props) {
		// Call parent constructor
		super(props);

		// Define a state
		this.state = {
			value: props.value ? props.value : ''
		};

		// Bind methods
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	// Event handlers
	onChangeHandler(e) {
		// Update the state, set the value
		this.setState({value: e.target.value});

		// Call the parent event handler
		this.props.onHandleInput(e, AnswerType.INPUT);
	}

	// Render
	render() {
		return (
			<div className = "answer col-lg-12">
				<div className = "form-group">
					<label>The answer is</label>
					<input className = "form-control"
						type = "text" 
						value = { this.state.value }
						onChange = { this.onChangeHandler }/>
				</div>
			</div>
		);
	}
}