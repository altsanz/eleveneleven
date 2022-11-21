import React from "react";
import react from "react";
export interface RouteContextValue {
  route: string;
}

export const RouteContext = react.createContext<RouteContextValue>({
  route: "start",
});

export const UseRoute = () => {
  const routeContext = React.useContext(RouteContext);
  const [route, setRoute] = React.useState(routeContext.route);

  return [route, setRoute] as const;
};
