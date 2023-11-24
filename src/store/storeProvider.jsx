import { createContext, useContext, useReducer } from "react";

export const StoreContext = createContext();

// export const StoreProvider = ({ children }) => {
//   <StoreContext.Provider value
//   ={useReducer(reducer, initialState)}>{children}
//   </StoreContext.Provider>;
// };

export const StoreProvider = () => {
  <StoreContext.Provider
    value={useReducer(reducer, initialState)}
  ></StoreContext.Provider>;
};

