/* eslint-disable react-refresh/only-export-components */

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config/env";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return {
      loading: false,
      getUserLoading: Boolean(token),
      error: null,
      user: null,
    };
  });

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return;
    }

    try {
      setState((prevState) => ({
        ...prevState,
        getUserLoading: true,
      }));

      const response = await axios.get(`${API_BASE_URL}/auth/get-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setState((prevState) => ({
        ...prevState,
        user: response.data,
        getUserLoading: false,
      }));
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        user: null,
        getUserLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email, password) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const accessToken = response.data?.access_token;
      const token =
        typeof accessToken === "string"
          ? accessToken
          : accessToken?.token ?? response.data?.token;

      if (!token) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: "Invalid login response: no token",
        }));
        return { error: "Invalid login response: no token" };
      }

      localStorage.setItem("token", token);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: null,
      }));

      await fetchUser();
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setState((prevState) => ({
        ...prevState,
        error: error.response?.data?.error || "Login failed",
        loading: false,
      }));
      return { error: error.response?.data?.error || "Login failed" };
    }
  };

  const register = async (data) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      await axios.post(`${API_BASE_URL}/auth/register`, data);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: null,
      }));

      navigate("/signup/success");
    } catch (error) {
      console.error("Error registering:", error);
      setState((prevState) => ({
        ...prevState,
        error: error.response?.data?.error || "Registration failed",
        loading: false,
      }));

      return { error: state.error };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState((prevState) => ({
      ...prevState,
      user: null,
      loading: false,
      error: null,
    }));
    navigate("/login");
  };

  const isAuthenticated = Boolean(state.user);
  const userRole = state.user?.role ?? (state.user ? "user" : null);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        isAuthenticated,
        userRole,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };