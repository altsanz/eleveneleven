import React, { useEffect } from "react";
import { DigitMetadata } from "./types";
import { useActiveDigitIndex } from "./UseActiveDigit";

export const useRevealingNumber = (
  number: number,
  onComplete?: () => void,
  onWrong?: () => void
): {
  digitsTemp: ReadonlyArray<DigitMetadata>;
  activeDigitIndex: number;
  submitNumber: (number: number) => void;
} => {
  const { activeDigitIndex, resetActiveDigitIndex, advanceActiveDigitIndex } =
    useActiveDigitIndex();

  const [digitsTemp, setDigits] = React.useState<ReadonlyArray<DigitMetadata>>(
    number
      .toString(10)
      .split("")
      .map((digit) => ({ digit, reveal: false }))
  );
  const submitNumber = React.useCallback(
    (number: number) => {
      const pressedKeyMatchesActiveDigit =
        parseInt(digitsTemp[activeDigitIndex]?.digit, 10) === number;
      pressedKeyMatchesActiveDigit &&
        setDigits(
          digitsTemp.map((digit, i) =>
            i === activeDigitIndex ? { ...digit, reveal: true } : digit
          )
        );
      pressedKeyMatchesActiveDigit && advanceActiveDigitIndex();
      !pressedKeyMatchesActiveDigit && onWrong?.();
    },
    [activeDigitIndex, advanceActiveDigitIndex, digitsTemp, onWrong]
  );

  React.useEffect(() => {
    const revealWhenMatch = ({ key }: KeyboardEvent) => {
      const pressedKeyIsNumber = /\d/.test(key);
      pressedKeyIsNumber && submitNumber(parseInt(key, 10));
    };

    document.addEventListener("keypress", revealWhenMatch, false);
    return () => document.removeEventListener("keypress", revealWhenMatch);
  }, [activeDigitIndex, advanceActiveDigitIndex, digitsTemp, submitNumber]);

  React.useEffect(() => {
    resetActiveDigitIndex();
    setDigits(splitNumber(number));
  }, [number, resetActiveDigitIndex]);

  const fullNumberRevealed = activeDigitIndex === digitsTemp.length;

  fullNumberRevealed && onComplete?.();

  return { digitsTemp, activeDigitIndex, submitNumber };
};

function splitNumber(number: number): ReadonlyArray<DigitMetadata> {
  return number
    .toString(10)
    .split("")
    .map((digit) => ({ digit, reveal: false }));
}
