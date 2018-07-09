// System imports

// Custom imports
import AnswerType from './../const/AnswerType';

// Class definition
export default class Question {

	// Constructor
	constructor(pId, pText, pOptions) {
		// Set properties
		this.id = pId;
		this.text = pText;
		this.answerType = pOptions ? AnswerType.CHECKBOX : AnswerType.INPUT;
		this.options = pOptions ? pOptions : null;
		this.value = null;
	}

	// Getters


	// Setters


	// Functions

}