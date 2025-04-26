export default function NextButton({ dispatch, answer, children }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: children === "Next" ? "nextQuestion" : "finishQuiz" })}
    >
      { children }
    </button>
  );
}
