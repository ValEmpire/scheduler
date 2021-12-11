import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); //array

  // this will transition the ui
  // this will determine wchich component will be render by which transition it on
  const transition = (newMode, replace = false) => {
    setMode((prevMode) => {
      setHistory((prevHistory) => {
        if (replace) prevHistory.pop();

        return [...prevHistory, newMode];
      });

      return newMode;
    });
  };

  // back will return the previous mode
  const back = () => {
    if (mode === initial) return setMode(initial);

    setHistory((prevHistory) => {
      prevHistory.pop();

      const lastHistory = history[history.length - 1];

      setMode(lastHistory);

      return prevHistory;
    });
  };

  return { back, mode, transition };
}
