import React from "react";

/**
 * Handles and reset the index regarding a number of the active digit
 */
export const useActiveDigitIndex = () => {
  const [activeDigitIndex, setActiveDigitIndex] = React.useState(0);
  const resetActiveDigitIndex = React.useCallback(
    () => setActiveDigitIndex(0),
    []
  );
  const advanceActiveDigitIndex = React.useCallback(
    () => setActiveDigitIndex(activeDigitIndex + 1),
    [activeDigitIndex]
  );
  return { resetActiveDigitIndex, advanceActiveDigitIndex, activeDigitIndex };
};
