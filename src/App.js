import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Questions";
import qBank from "./QuestionBank";
import Score from "./Score";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulty: "",
      questionBank: [],
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      showAnswer: false,
      quizEnd: false,
    };
  }

  handleDifficultySelect = (difficulty) => {
	this.setState({ difficulty }, this.loadQuestions);
  };
  
  loadQuestions = () => {
	const { difficulty } = this.state;
	const filteredQuestions = qBank.filter((q) => q.difficulty === difficulty);
	this.setState({ questionBank: filteredQuestions });
  };
  
  

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
  };

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption, score } = this.state;
    if (selectedOption === questionBank[currentQuestion].answer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
    }
    this.setState({ showAnswer: true });
  };

  handleNextQuestion = () => {
    const { questionBank, currentQuestion } = this.state;
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
        showAnswer: false,
      }));
    } else {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const {
      difficulty,
      questionBank,
      currentQuestion,
      selectedOption,
      score,
      showAnswer,
      quizEnd,
    } = this.state;

    if (!difficulty) {
      // Display difficulty selection screen
      return (
        <div className="App d-flex flex-column align-items-center justify-content-center vh-100">
          <h1 className="app-title">QUIZ APP</h1>
          <div>
            <h4>Choose Difficulty:</h4>
            <button onClick={() => this.handleDifficultySelect("easy")} className="btn m-2">
              Easy
            </button>
            <button onClick={() => this.handleDifficultySelect("medium")} className="btn m-2">
              Medium
            </button>
            <button onClick={() => this.handleDifficultySelect("hard")} className="btn  m-2">
              Hard
            </button>
          </div>
        </div>
      );
    }

    // Display question or score screen based on quiz progress
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="app-title">QUIZ APP</h1>
        {!quizEnd ? (
			currentQuestion < questionBank.length ? (
				<Question
				question={questionBank[currentQuestion]}
				selectedOption={selectedOption}
				onOptionChange={this.handleOptionChange}
				onSubmit={this.handleFormSubmit}
				showAnswer={showAnswer}
				onNextQuestion={this.handleNextQuestion}
				/>
			) : (
				<p>No more questions.</p>
			)
			) : (
			<Score score={score} className="score" />
			)}

      </div>
    );
  }
}

export default App;
