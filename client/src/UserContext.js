import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // You should wrap the children with the context provider
 const [userInfo, setUserInfo]=useState({});
  return <UserContext.Provider value={{userInfo,setUserInfo}} >{children}</UserContext.Provider>;
}
