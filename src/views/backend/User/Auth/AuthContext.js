import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Provide context to the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to get the user from the token
  const loadUserFromToken = () => {
    const tokenWithExpiry = JSON.parse(localStorage.getItem("authToken"));
    if (tokenWithExpiry && new Date().getTime() < tokenWithExpiry.expiryTime) {
      const { token } = tokenWithExpiry;
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);
        setUser(decoded.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token", error);
        setIsAuthenticated(false);
      }
    }
  };

  // Check for user on app load
  useEffect(() => {
    loadUserFromToken();
  }, []);

  // Login function
  const login = (token) => {
    const expiryTime = new Date().getTime() + 900000; // 15 minutes expiry
    const tokenWithExpiry = { token, expiryTime };
    localStorage.setItem("authToken", JSON.stringify(tokenWithExpiry));
    loadUserFromToken();
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
