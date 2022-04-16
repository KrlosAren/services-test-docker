import React, { createContext, useReducer } from "react";
import { studentReducer } from "./studentReducer";

export const StudentContext = createContext({});

const initialState = {
  students: [],
  disabled: false,
  student: {},
};

export const StudentProvider = ({ children }) => {
  const [studentState, dispatch] = useReducer(studentReducer, initialState);

  return (
    <StudentContext.Provider
      value={{
        studentState,
        dispatch,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
