import React, { createContext, useReducer } from "react";

const initialState = { color: "data" };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [data, dispatch] = useReducer((data, action) => {
    switch (action.type) {
      case "pass":
        const newState = { ...data,  recipe: action.recipe  };
        return newState;
      default:
        return null;
    }
  }, initialState);

  return <Provider value={{ data, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };