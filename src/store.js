import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  createContext,
} from "react";
import { useImmerReducer } from "use-immer";

export const Context = createContext();

function GlobalContextProvider(props) {
  const initialState = {
    flash: [],
    user: null,
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "setUser":
        draft.user = action.user;
        break;
      case "logout":
        draft.user = null;
        break;
      case "flash":
        draft.flash.push(action.value);
        break;
    }
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const initialContext = { appState: state, appDispatch: dispatch };

  return (
    <Context.Provider value={initialContext}>{props.children}</Context.Provider>
  );
}

export default GlobalContextProvider;
