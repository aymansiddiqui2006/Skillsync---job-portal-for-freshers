import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/apiInstance";
import { APIpaths } from "../utils/apiPath.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isAuthenticated = !!token;

  const fetchUser = async () => {
    try {
      const res = await api.get(APIpaths.AUTH.GET_USER);
      setUser(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    window.location.href = "/landing-page";
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);