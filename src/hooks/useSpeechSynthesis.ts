import React from "react";
const voicesList = window.speechSynthesis.getVoices();
const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const webkit = !!ua.match(/WebKit/i);
const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

export const UseSpeechSynthesis = () => {
  const [text, setText] = React.useState<string>();
  const [utterance, setUtterance] = React.useState<SpeechSynthesisUtterance>();

  React.useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    // Without the following line, voice remains in English on iOS
    // voicesList is here the retured value of speechSynthesis.getVoices()

    if (iOSSafari) {
      utterance.voice =
        voicesList.find(
          (voice) => voice.voiceURI === "com.apple.voice.compact.de-DE.Anna"
        ) ?? null;
    } else {
      utterance.voice =
        voicesList.find((voice) => voice.lang === "de-DE") ?? null;
    }
    utterance.lang = "de-DE";
    setUtterance(utterance);
  }, [text]);

  const play = () => utterance && window.speechSynthesis.speak(utterance);
  return { play, setText };
};
