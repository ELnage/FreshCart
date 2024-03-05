import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
    useEffect( 
      function() {
  if (localStorage.getItem("tkn")) {
    setToken(localStorage.getItem("tkn"));
  }
      } , []
    )

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          setToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
