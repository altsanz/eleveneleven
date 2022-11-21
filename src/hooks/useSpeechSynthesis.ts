import React from "react";

export const UseSpeechSynthesis = () => {
  const [text, setText] = React.useState<string>();
  const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance>();

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.lang = "de-DE";
    setUtterance(utterance);
  }, [text]);

  const play = () => utterance && window.speechSynthesis.speak(utterance);
  return { play, setText };
};
