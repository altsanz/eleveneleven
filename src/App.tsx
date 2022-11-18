import React from "react";
import "./App.css";
import NumberWrapper from "./components/NumberWrapper";
const MAX_NUMBER = 100;
const generateRandomNumber = (max: number) => Math.round(Math.random() * max);
function App() {
  const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance>();
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [letsGo, setLetsGo] = React.useState(false);
  const [number, setNumber] = React.useState(() =>
    generateRandomNumber(MAX_NUMBER)
  );

  React.useEffect(() => {
    const timeout =
      letsGo && utterance
        ? setTimeout(() => {
            window.speechSynthesis.speak(utterance);
          }, 200)
        : undefined;
    return () => {
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [utterance, letsGo]);

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.rate = 0.8;
    utterance.lang = "de-DE";
    setUtterance(utterance);
  }, [letsGo, number]);

  const replayOnSpace = React.useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "Space" && letsGo && utterance) {
        ev.preventDefault();
        ev.stopPropagation();
        window.speechSynthesis.speak(utterance);
      }
    },
    [letsGo, utterance]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", replayOnSpace, false);
    return () => document.removeEventListener("keydown", replayOnSpace);
  }, [replayOnSpace]);

  const renewNumber = () => {
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let newNumber = number;
      while (newNumber === number) {
        newNumber = generateRandomNumber(MAX_NUMBER);
      }
      return setNumber(newNumber);
    }, 1000);
  };

  return (
    <div className="App h-screen">
      {letsGo && <NumberWrapper number={number} onComplete={renewNumber} />}
      {!letsGo && (
        <button onClick={() => setLetsGo(true)}>Gimme a nummer!</button>
      )}
    </div>
  );
}

export default App;
