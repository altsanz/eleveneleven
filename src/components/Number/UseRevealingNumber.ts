import React from "react";
import { DigitMetadata } from "./types";
import { useActiveDigit } from "./UseActiveDigit";

export const useRevealingNumber = (
  number: number,
  onComplete?: () => void,
  onWrong?: () => void
): Readonly<
  [ReadonlyArray<DigitMetadata>, number, (number: number) => void]
> => {
  const { activeDigit, resetActiveDigit, advanceActiveDigit } =
    useActiveDigit();
  const [digitsTemp, setDigits] = React.useState<ReadonlyArray<DigitMetadata>>(
    number
      .toString(10)
      .split("")
      .map((digit) => ({ digit, reveal: false }))
  );
  const submitNumber = React.useCallback(
    (number: number) => {
      const pressedKeyMatchesActiveDigit =
        parseInt(digitsTemp[activeDigit]?.digit, 10) === number;
      pressedKeyMatchesActiveDigit &&
        setDigits(
          digitsTemp.map((digit, i) =>
            i === activeDigit ? { ...digit, reveal: true } : digit
          )
        );
      pressedKeyMatchesActiveDigit && advanceActiveDigit();
      !pressedKeyMatchesActiveDigit && onWrong?.();
    },
    [activeDigit, advanceActiveDigit, digitsTemp, onWrong]
  );

  React.useEffect(() => {
    const revealWhenMatch = ({ key }: KeyboardEvent) => {
      const pressedKeyIsNumber = /\d/.test(key);
      pressedKeyIsNumber && submitNumber(parseInt(key, 10));
    };

    document.addEventListener("keypress", revealWhenMatch, false);
    return () => document.removeEventListener("keypress", revealWhenMatch);
  }, [activeDigit, advanceActiveDigit, digitsTemp, onWrong, submitNumber]);

  React.useEffect(() => {
    resetActiveDigit();
    setDigits(splitNumber(number));
  }, [number, resetActiveDigit]);

  const fullNumberRevealed = activeDigit === digitsTemp.length;

  fullNumberRevealed && onComplete?.();

  return [digitsTemp, activeDigit, submitNumber] as const;
};

function splitNumber(number: number): ReadonlyArray<DigitMetadata> {
  return number
    .toString(10)
    .split("")
    .map((digit) => ({ digit, reveal: false }));
}
