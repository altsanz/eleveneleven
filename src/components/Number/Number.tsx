import React, { useEffect, useState } from "react";
import { Numpad } from "../Numpad/Numpad";
import { NumberWrapperProps } from "./types";
import { useRevealingNumber } from "./UseRevealingNumber";
import { useSpring, animated } from "@react-spring/web";

/**
 * Orchestrates an exercise: which digits to show, which to hide, which one is active
 */
export const Number: React.FC<NumberWrapperProps> = ({
  number,
  onComplete,
}: NumberWrapperProps) => {
  const [isActiveDigitWrong, setIsActiveDigitWrong] = useState(false);

  const { digitsTemp, activeDigitIndex, submitNumber } = useRevealingNumber(
    number,
    onComplete,
    () => {
      setIsActiveDigitWrong(true);
    }
  );

  useEffect(() => {
    setIsActiveDigitWrong(false);
  }, [activeDigitIndex]);

  return (
    <div className="h-full grid grid-cols-1 grid-rows-3">
      <div className="row-span-2 flex text-5xl place-self-center">
        {digitsTemp.map(({ digit, reveal }, i) => (
          <Digit
            key={parseInt(digit, 10) + `${i}`}
            reveal={reveal}
            active={i === activeDigitIndex}
            wrong={i === activeDigitIndex && isActiveDigitWrong}
          >
            {parseInt(digit, 10)}
          </Digit>
        ))}
      </div>
      {isTouchDevice() && (
        <div className="row-span-1">
          <Numpad onClick={submitNumber} />
        </div>
      )}
    </div>
  );
};

/**
 *
 * @param reveal Show the number or not
 * @param children The number that is going to be shown
 * @param active Is current digit the one that needs to be written?
 * @returns
 */
function Digit({
  reveal = false,
  children,
  active = false,
  wrong = false,
}: {
  children: number;
  active?: boolean;
  reveal?: boolean;
  wrong?: boolean;
}) {
  const spring = useSpring({
    color: wrong ? "red" : "rgb(236 72 153)",
  });
  return (
    <animated.div
      style={active ? spring : {}}
      className={active ? "text-pink-500" : "text-purple-500"}
    >
      {reveal ? children : "*"}
    </animated.div>
  );
}

function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
