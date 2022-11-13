import React from "react";
interface DigitMetadata {
  digit: string;
  reveal: boolean;
}
interface NumberWrapperProps {
  number: number;
}
const NumberWrapper: React.FC<NumberWrapperProps> = ({
  number,
}: NumberWrapperProps) => {
  const [activeDigit, setActiveDigit] = React.useState(0);
  const [digitsTemp, setDigits] = React.useState<ReadonlyArray<DigitMetadata>>(
    number
      .toString(10)
      .split("")
      .map((digit) => ({ digit, reveal: false }))
  );
  React.useEffect(() => {
    const revealWhenMatch = ({ key }: KeyboardEvent) => {
      const pressedKeyMatchesACtiveDigit =
        key === digitsTemp[activeDigit].digit;
      pressedKeyMatchesACtiveDigit &&
        setDigits(
          digitsTemp.map((digit, i) =>
            i === activeDigit ? { ...digit, reveal: true } : digit
          )
        );
      pressedKeyMatchesACtiveDigit && setActiveDigit(activeDigit + 1);
    };
    document.addEventListener("keypress", revealWhenMatch, false);
    return () => document.removeEventListener("keypress", revealWhenMatch);
  }, [activeDigit, digitsTemp]);
  // const digits = number
  //   .toString(10)
  //   .split("")
  //   .map((digit, i) => (
  //     <Digit key={parseInt(digit, 10) + `${i}`} active={i === activeDigit}>
  //       {parseInt(digit, 10)}
  //     </Digit>
  //   ));
  return (
    <>
      {digitsTemp.map(({ digit, reveal }, i) => (
        <Digit
          key={parseInt(digit, 10) + `${i}`}
          reveal={reveal}
          active={i === activeDigit}
        >
          {parseInt(digit, 10)}
        </Digit>
      ))}
    </>
  );
};

export default NumberWrapper;

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
    <div style={{ color: active ? "red" : "inherit" }}>
      {reveal ? children : "*"}
    </div>
  );
}
// document.addEventListener('keypress', (ev: KeyboardEvent) => console.log(ev.key), false);

/**
 * 1. recibe numero con addEventListener
 * 2. es el numero igual que el activo?
 * 3. SI: revela activo, mueve el activo al siguiente
 */
