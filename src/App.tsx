import React from "react";
import "./App.css";
import NumberWrapper from "./components/NumberWrapper";
import { UseSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { UseRoute } from "./RouteContext";
const MAX_NUMBER = 100;
const generateRandomNumber = (max: number) => Math.round(Math.random() * max);
function App() {
  const [route, setRoute] = UseRoute();
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [letsGo, setLetsGo] = React.useState(false);
  const [number, setNumber] = React.useState(() =>
    generateRandomNumber(MAX_NUMBER)
  );
  const { play, setText } = UseSpeechSynthesis();

  React.useEffect(() => {
    const timeout = letsGo
      ? setTimeout(() => {
          play();
        }, 200)
      : undefined;
    return () => {
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [letsGo, play]);

  React.useEffect(() => {
    setText(number.toString());
  }, [number, setText]);

  const replayOnSpace = React.useCallback(
    (ev: KeyboardEvent) => {
      if (ev.code === "Space" && letsGo) {
        ev.preventDefault();
        ev.stopPropagation();
        play();
      }
    },
    [letsGo, play]
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

  const start = () => {
    setLetsGo(true);
    setRoute("numbers");
  };

  !letsGo && route !== "start" && setRoute("start");

  return (
    <div className="App h-screen">
      {letsGo && route === "numbers" && (
        <NumberWrapper number={number} onComplete={renewNumber} />
      )}
      {route === "start" && (
        <button onClick={() => start()}>Gimme a nummer!</button>
      )}
      {letsGo && route === "summary" && <>done!</>}
    </div>
  );
}

export default App;
