import { createContext } from "react";

export const Context = createContext({});

export const Provider = () => {
  // aqui tendria que aceptar el numero.
  return <Context.Provider value={{}}></Context.Provider>;
};

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// en app tsx usamos el hook y entonces le pasamos los metodos que queremos compartir.
