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
    loadingUser: true,
    postFormModal: {
      isOpen: false,
      prepopulate: null,
    },
    boardFormModal: {
      isOpen: false,
      prepopulate: null,
    },
    postModal: {
      isOpen: false,
      postId: null,
    },
  };

  const reducer = (draft, action) => {
    switch (action.type) {
      case "setUser":
        draft.user = action.user;
        draft.loadingUser = false;
        break;
      case "logout":
        draft.user = null;
        draft.loadingUser = false;
        break;
      case "flash":
        draft.flash.push(action.value);
        break;
      case "openBoardFormModal":
        draft.boardFormModal.prepopulate = action.data;
        draft.boardFormModal.isOpen = true;
        break;
      case "closeBoardFormModal":
        draft.boardFormModal.prepopulate = null;
        draft.boardFormModal.isOpen = false;
        break;
      case "openPostFormModal":
        draft.postFormModal.prepopulate = action.data;
        draft.postFormModal.isOpen = true;
        break;
      case "closePostFormModal":
        draft.postFormModal.prepopulate = null;
        draft.postFormModal.isOpen = false;
        break;
      case "openPostModal":
        draft.postModal.postId = action.data;
        draft.postModal.isOpen = true;
        break;
      case "closePostModal":
        draft.postModal.postId = null;
        draft.postModal.isOpen = false;
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
