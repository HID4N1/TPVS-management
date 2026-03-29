import { useState, useEffect, useCallback, useRef } from "react";
import authAPI from "../services/auth";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialized = useRef(false);

  // ----------------------------
  // 🔐 Token utils
  // ----------------------------
  const isTokenExpired = (token) => {
    try {
      const base64 = token.split(".")[1];
      const payload = JSON.parse(window.atob(base64));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  // ----------------------------
  // 🚪 Logout
  // ----------------------------
  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("lastUserUpdate");
    localStorage.removeItem("lastAuthCheck");

    setUser(null);
  }, []);

  // ----------------------------
  // 👤 Fetch current user (/me)
  // ----------------------------
  const fetchMe = useCallback(async () => {
    try {
      const data = await authAPI.me();

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("lastUserUpdate", Date.now().toString());
      localStorage.setItem("lastAuthCheck", Date.now().toString());

      setUser(data);
    } catch (error) {
      console.error("fetchMe failed:", error);
      logout();
    }
  }, [logout]);

  // ----------------------------
  // 🔑 Login
  // ----------------------------
  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 🔥 Always fetch full user after login
      await fetchMe();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  // ----------------------------
  // 🔄 Manual user refresh
  // ----------------------------
  const updateUser = useCallback(async () => {
    const lastUpdate = localStorage.getItem("lastUserUpdate");
    const now = Date.now();
    const oneMinute = 60 * 1000;

    if (lastUpdate && now - parseInt(lastUpdate) < oneMinute) {
      console.log("Skipping updateUser (cached)");
      return;
    }

    await fetchMe();
  }, [fetchMe]);

  // ----------------------------
  // 🚀 Init Auth (on app start)
  // ----------------------------
  useEffect(() => {
    const initAuth = async () => {
      if (isInitialized.current) return;
      isInitialized.current = true;

      const accessToken = localStorage.getItem("access");

      if (!accessToken || isTokenExpired(accessToken)) {
        logout();
        setLoading(false);
        return;
      }

      // 🔥 Always refresh user from backend
      await fetchMe();

      setLoading(false);
    };

    initAuth();
  }, [fetchMe, logout]);

  // ----------------------------
  // 📡 Global logout event listener
  // ----------------------------
  useEffect(() => {
    const handleLogout = () => setUser(null);

    window.addEventListener("auth:logout", handleLogout);
    return () =>
      window.removeEventListener("auth:logout", handleLogout);
  }, []);

  // ----------------------------
  // 📦 Context value
  // ----------------------------
  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,

    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isAgent: user?.role === "agent",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};