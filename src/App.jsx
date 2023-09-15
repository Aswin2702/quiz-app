import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Quiz from "./Components/Quiz";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import Questions from "./Components/Questions";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const SECS_PER_QUES = 30;

const data = JSON.parse(localStorage.getItem("data"));

const initialState = {
  questions: [],

  // loading, ready, error, active, finished
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highScore: data === undefined ? 0 : Number(data),
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetchFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUES,
      };
    case "newAnswer":
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQues":
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "reset":
      localStorage.setItem("data", JSON.stringify(state.highScore));
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action is Unknown");
  }
}

function App() {
  const [
    {
      questions,
      status,
      currentIndex,
      answer,
      points,
      highScore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberQues = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(() => {
    fetch(import.meta.env.VITE_URL)
      .then((res) => res.json())
      .then(
        (data) => dispatch({ type: "dataReceived", payload: data.questions }) // payload: data
      ) // data.questions for deployment only
      .catch(() => dispatch({ type: "fetchFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Quiz>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {(status === "ready" || status === "reset") && (
          <StartScreen numberQues={numberQues} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={currentIndex}
              numberQues={numberQues}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              question={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={currentIndex}
                numberQues={numberQues}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Quiz>
    </div>
  );
}

export default App;
