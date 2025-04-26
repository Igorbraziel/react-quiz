export default function FinishScreen({ score, totalScoreAvailable, highscore, dispatch }) {
  const percentage = (score / totalScoreAvailable) * 100;

  let emoji;
  if (percentage === 100) emoji = "🏆";
  else if (percentage >= 80) emoji = "🥇";
  else if (percentage >= 50) emoji = "🥈";
  else if (percentage >= 20) emoji = "🥉";
  else emoji = "🥲";

  return (
    <>
    <p className="result">
      <span>{emoji}</span> You scored <strong>{score}</strong> out of{" "}
      {totalScoreAvailable} ({percentage.toFixed(2)}%)
    </p>
    <p className="highscore">
    (Highscore: <strong>{highscore}</strong> points)
    </p>
    <button className="btn btn-ui" onClick={() => dispatch({ type: "restart"})}>Restart Quiz</button>
    </>

  );
}
