import React from "react";
import { DigitMetadata } from "./types";
import { useActiveDigit } from "./UseActiveDigit";

export const useRevealingNumber = (
  number: number
): Readonly<
  [ReadonlyArray<DigitMetadata>, number, boolean, (number: number) => void]
> => {
  const { activeDigit, resetActiveDigit, advanceActiveDigit } =
    useActiveDigit();
  const [digitsTemp, setDigits] = React.useState<ReadonlyArray<DigitMetadata>>(
    number
      .toString(10)
      .split("")
      .map((digit) => ({ digit, reveal: false }))
  );

  React.useEffect(() => {
    const revealWhenMatch = ({ key }: KeyboardEvent) => {
      const pressedKeyMatchesActiveDigit =
        key === digitsTemp[activeDigit]?.digit;
      pressedKeyMatchesActiveDigit &&
        setDigits(
          digitsTemp.map((digit, i) =>
            i === activeDigit ? { ...digit, reveal: true } : digit
          )
        );
      pressedKeyMatchesActiveDigit && advanceActiveDigit();
    };

    document.addEventListener("keypress", revealWhenMatch, false);
    return () => document.removeEventListener("keypress", revealWhenMatch);
  }, [activeDigit, advanceActiveDigit, digitsTemp]);

  React.useEffect(() => {
    resetActiveDigit();
    setDigits(splitNumber(number));
  }, [number, resetActiveDigit]);

  const fullNumberRevealed = activeDigit === digitsTemp.length;

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
    },
    [activeDigit, advanceActiveDigit, digitsTemp]
  );
  return [digitsTemp, activeDigit, fullNumberRevealed, submitNumber] as const;
};

function splitNumber(number: number): ReadonlyArray<DigitMetadata> {
  return number
    .toString(10)
    .split("")
    .map((digit) => ({ digit, reveal: false }));
}
