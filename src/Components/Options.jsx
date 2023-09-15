/* eslint-disable react/prop-types */
export function Options({ question, dispatch, answer }) {
  const hasAnswer = answer != null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          className={`btn btn-option ${
            hasAnswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          } ${index === answer ? "answer" : ""}`}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          <div className="inner-option">
            {option}
            {hasAnswer ? (
              index === question.correctOption ? (
                <img
                  style={{ width: "24px" }}
                  width="24"
                  height="24"
                  src="https://img.icons8.com/color/24/checkmark--v1.png"
                  alt="checkmark--v1"
                />
              ) : (
                <img
                  style={{ width: "24px" }}
                  width="24"
                  height="24"
                  src="https://img.icons8.com/color/24/delete-sign--v1.png"
                  alt="delete-sign--v1"
                />
              )
            ) : (
              <></>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
