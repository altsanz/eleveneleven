import React from "react";
import { NumberWrapperProps } from "./types";
import { useRevealingNumber } from "./UseRevealingNumber";

/**
 * Orchestrates an exercise: which digits to show, which to hide, which one is active
 */
export const Number: React.FC<NumberWrapperProps> = ({
  number,
  onComplete,
}: NumberWrapperProps) => {
  const [digitsTemp, activeDigit, complete] = useRevealingNumber(number);
  React.useEffect(() => {
    complete && onComplete();
  }, [complete, onComplete]);
  return (
    <div className="flex text-5xl justify-center">
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
