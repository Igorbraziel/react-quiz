export default function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
           ${
             answer !== null
               ? question.correctOption === index
                 ? "correct"
                 : "wrong"
               : ""
           }`}
          key={option}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
