// Import system components
import React from 'react';

// Import custom classes
import AnswerType from './../../const/AnswerType';

export default class AnswerCheckbox extends React.Component {

	// Constructor
	constructor(props) {
		// Call parent constructor
		super(props);

		// Define a state and set initial values
		this.state = {
			checked: parseInt(props.value, 10) === props.option.id ? true: false
		};

		// Bind methods
		this.onChangeHandler = this.onChangeHandler.bind(this);
	};

	// System event handlers
	componentDidUpdate(prevProps, prevState, snapshot) {
		// Now, in order to guarantee that only one checkbox is selected at any time
		// We need to check, if the value in the parent state
		// Is equal to the our ID
		if (this.state.checked && this.props.value && parseInt(this.props.value, 10) !== this.props.option.id) {
			// Update the state
			this.setState({checked: false});
		}
	}

	// Event handlers
	onChangeHandler(e) {
		// Update the state
		this.setState({checked: e.target.checked});

		// Update the parent
		this.props.onHandleInput(e, AnswerType.CHECKBOX);
	};

	// Render
	render() {
		return (
			<div className = "col-md-12 col-lg-6">
				<div className = "checkbox form-check">
					<input className = "form-check-input"
						type = "checkbox"
						value = { this.props.option.id }
						checked = { this.state.checked }
						onChange = { this.onChangeHandler }/>

					<label className = "form-check-label">
						{ this.props.option.text }
					</label>
				</div>
			</div>
		);
	};
}