import React from "react";
import { Numpad } from "../Numpad/Numpad";
import { NumberWrapperProps } from "./types";
import { useRevealingNumber } from "./UseRevealingNumber";

/**
 * Orchestrates an exercise: which digits to show, which to hide, which one is active
 */
export const Number: React.FC<NumberWrapperProps> = ({
  number,
  onComplete,
}: NumberWrapperProps) => {
  const [digitsTemp, activeDigit, complete, submitNumber] =
    useRevealingNumber(number);
  React.useEffect(() => {
    complete && onComplete();
  }, [complete, onComplete]);
  return (
    <div className="h-full grid grid-cols-1 grid-rows-3">
      <div className="row-span-2 flex text-5xl place-self-center">
        {digitsTemp.map(({ digit, reveal }, i) => (
          <Digit
            key={parseInt(digit, 10) + `${i}`}
            reveal={reveal}
            active={i === activeDigit}
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
export function Digit({
  reveal = false,
  children,
  active = false,
}: {
  children: number;
  active?: boolean;
  reveal?: boolean;
}) {
  return (
    <div className={active ? "text-pink-500" : "text-purple-500"}>
      {reveal ? children : "*"}
    </div>
  );
}

function isTouchDevice(): boolean {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
