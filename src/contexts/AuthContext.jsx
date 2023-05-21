import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import PropTypes from "prop-types";

const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
