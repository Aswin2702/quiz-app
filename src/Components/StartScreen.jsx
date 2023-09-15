/* eslint-disable react/prop-types */
function StartScreen({ numberQues, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberQues} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&rsquo;s start
      </button>
    </div>
  );
}

export default StartScreen;
