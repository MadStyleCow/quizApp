// Import system components
import React from 'react';

// Import CSS
import './QuestionText.css';

// Question container - root container for the questions
export default class QuestionText extends React.Component {



	// Render
	render() {
		// Render text
		const text = this.props.text.split('\n').map((item, i) => {
    		return <p key={i}>{item}</p>;
		});;

		return (
			<code className = "questionText">{ text }</code>
		);
	}
}