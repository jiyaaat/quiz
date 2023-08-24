// Question.js

import React, { Component } from "react";
import Options from "./Options";
import './Questions.css';

class Question extends Component {
	render() {
		console.log("Question Props:", this.props);
		console.log("Question:", this.props.question);

		const {
			question,
			selectedOption,
			onOptionChange,
			onSubmit,
			showAnswer,
			onNextQuestion,
		} = this.props;

		return (
			<div className="question-container border p-3 mb-3">
				<h3>Question {question.id}</h3>
				<h5 className="mt-2">{question.question}</h5>
				<form onSubmit={onSubmit} className="mt-2">
					<Options
						options={question.options}
						selectedOption={selectedOption}
						onOptionChange={onOptionChange}
					/>
					<div className="d-flex justify-content-between align-items-center mt-2">
						<button type="submit"  className="btn">
							SUBMIT
						</button>
						{showAnswer && (
							<button onClick={onNextQuestion} className="btn">
								Next Question
							</button>
						)}
					</div>
				</form>
				{showAnswer && (
					<div className=" mt-2">
						Correct answer:{question.answer}
					</div>
				)}
			</div>
		);
	}
}

export default Question;
