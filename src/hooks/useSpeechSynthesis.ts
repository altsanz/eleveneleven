import React from "react";
const voicesList = window.speechSynthesis.getVoices();

export const UseSpeechSynthesis = () => {
  const [text, setText] = React.useState<string>();
  const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance>();

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    // Without the following line, voice remains in English on iOS
    // voicesList is here the retured value of speechSynthesis.getVoices()
    utterance.voice =
      voicesList.find((voice) => voice.lang === "de-DE") ?? null;
    utterance.lang = "de-DE";
    setUtterance(utterance);
  }, [text]);

  const play = () => utterance && window.speechSynthesis.speak(utterance);
  return { play, setText };
};
