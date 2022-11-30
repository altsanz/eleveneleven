import React from "react";
import "./App.css";
import { Numpad } from "./components/Numpad/Numpad";
import { UseRoute } from "./contexts/RouteContext";
import { UseSpeechSynthesis } from "./hooks/useSpeechSynthesis";
import { Number } from "./components/Number/Number";

const MAX_NUMBER = 100;
const generateRandomNumber = (max: number) => Math.round(Math.random() * max);
function App() {
  const [route, setRoute] = UseRoute();
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();
  const [letsGo, setLetsGo] = React.useState(false);
  const [number, setNumber] = React.useState(() =>
    generateRandomNumber(MAX_NUMBER)
  );
  const { play, setText: setSpeechText } = UseSpeechSynthesis();

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
    setSpeechText(number.toString());
  }, [number, setSpeechText]);

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
    <div className="App flex h-screen justify-center align-middle flex-col">
      <div className="h-full">
        {letsGo && route === "numbers" && (
          <Number number={number} onComplete={renewNumber} />
        )}
        {route === "start" && (
          <button
            className="text-4xl md:text-5xl text-purple-500 w-screen text-center cursor-pointer"
            onClick={() => start()}
          >
            Gimme a nummer!
          </button>
        )}
        {letsGo && route === "summary" && <>done!</>}
      </div>
    </div>
  );
}

export default App;
