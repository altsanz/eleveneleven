import React from "react";

export const useActiveDigit = () => {
  const [activeDigit, setActiveDigit] = React.useState(0);
  const resetActiveDigit = React.useCallback(() => setActiveDigit(0), []);
  const advanceActiveDigit = React.useCallback(
    () => setActiveDigit(activeDigit + 1),
    [activeDigit]
  );
  return { resetActiveDigit, advanceActiveDigit, activeDigit };
};
