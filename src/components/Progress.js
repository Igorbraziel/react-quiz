export default function Progress({ currentQuestion, numQuestions, score, totalScoreAvailable, answer }){
  return (
    <header className="progress">
      <progress max={numQuestions} value={currentQuestion + Number(answer !== null)} />

      <p>Question <strong>{currentQuestion + 1}</strong> / {numQuestions}</p>
      <p><strong>{score}</strong> / {totalScoreAvailable} points</p>
    </header>
  )
}