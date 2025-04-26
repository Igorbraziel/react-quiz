import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  currentQuestion: 0,
  answer: null,
  score: 0,
  highscore: JSON.parse(localStorage.getItem("highscore")) || 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentQuestion);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };
    case "finishQuiz":
      const highscore =
        state.score > state.highscore ? state.score : state.highscore;
      localStorage.setItem("highscore", JSON.stringify(highscore));

      return {
        ...state,
        status: "finished",
        answer: null,
        highscore: highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "clock":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    {
      questions,
      status,
      currentQuestion,
      answer,
      score,
      highscore,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalScoreAvailable = questions.reduce(
    (accumulator, currentQuestion) => accumulator + currentQuestion.points,
    0
  );

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              currentQuestion={currentQuestion}
              numQuestions={numQuestions}
              score={score}
              totalScoreAvailable={totalScoreAvailable}
              answer={answer}
            />
            <Question
              question={questions.at(currentQuestion)}
              dispatch={dispatch}
              answer={answer}
              score={score}
              totalScoreAvailable={totalScoreAvailable}
              numQuestions={numQuestions}
              currentQuestion={currentQuestion}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
              <NextButton dispatch={dispatch} answer={answer}>
                {currentQuestion + 1 === numQuestions ? "Finish" : "Next"}
              </NextButton>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            score={score}
            totalScoreAvailable={totalScoreAvailable}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
