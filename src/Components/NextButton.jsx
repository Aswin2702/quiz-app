/* eslint-disable react/prop-types */
function NextButton({ dispatch, answer, index, numberQues }) {
  if (answer == null) return null;
  if (index < numberQues - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQues" })}
      >
        Next
      </button>
    );

  if (index === numberQues - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
