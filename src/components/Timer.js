import { useEffect } from "react";

export default function Timer({ dispatch, timeRemaining }) {
  const seconds = timeRemaining % 60;
  const minutes = Math.floor(timeRemaining / 60)

  console.log(minutes, seconds);

  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: "clock" });
      }, 1000);

      return () => clearInterval(intervalId);
    },
    [dispatch]
  );

  return (
    <div className="timer" disabled={true}>
      {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
      {seconds < 10 ? `0${seconds}` : `${seconds}`}
    </div>
  );
}
