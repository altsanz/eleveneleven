import React from "react";
import "./App.css";
import NumberWrapper from "./components/NumberWrapper";
const MAX_NUMBER = 9999;
const generateRandomNumber = (max: number) => Math.round(Math.random() * max);
function App() {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [letsGo, setLetsGo] = React.useState(false);
  const [number, setNumber] = React.useState(() =>
    generateRandomNumber(MAX_NUMBER)
  );

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(number.toString());
    utterance.rate = 0.8;
    utterance.lang = "de-DE";
    letsGo && setTimeout(() => window.speechSynthesis.speak(utterance));
    return () => window.speechSynthesis.cancel();
  }, [letsGo, number]);

  const renewNumber = () => {
    timerRef.current = setTimeout(
      () => setNumber(generateRandomNumber(MAX_NUMBER)),
      1000
    );
  };

  React.useEffect(
    () => () => {
      timerRef.current && clearTimeout(timerRef.current);
    },
    []
  );
  console.log({ number });
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
