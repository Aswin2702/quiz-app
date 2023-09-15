/* eslint-disable react/prop-types */
function Progress({ index, numberQues, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={numberQues} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numberQues}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
