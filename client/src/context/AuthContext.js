import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const user = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(JSON.parse(user) || null);

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login/",
      inputs
    );
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/api/auth/logout/");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
