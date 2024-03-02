import React, { createContext, useReducer } from "react";

const initialState = {
  items: [],
  selected: null,
  isModalOpen: false,
};

const sessionReducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSIONS":
      return { ...state, items: action.payload };

    case "ADD_SESSION":
      return { ...state, items: [...state.items, action.payload] };

    case "SET_SELECTED":
      return { ...state, selected: action.payload };

    case "DELETE_SESSION":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        selected: null,
      };
    case "UPDATE_SESSION":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        selected: null,
      };
    case "MODAL":
      return {
        ...state,
        isModalOpen: action.payload,
      };

    default:
      return state;
  }
};

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  return (
    <SessionContext.Provider value={{ state, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
