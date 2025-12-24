/**
 * ============================================
 * Authentication Context
 * ============================================
 * 
 * This file manages user authentication state across the entire app.
 * 
 * WHAT IS A CONTEXT?
 * React Context lets you share data (like user info) with any component
 * in your app without passing props through every level.
 * 
 * HOW TO USE:
 * 1. Wrap your app with <AuthProvider> (done in App.tsx)
 * 2. In any component, use: const { user, login, logout } = useAuth()
 * 3. Check if logged in: if (isAuthenticated) { ... }
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User, LoginRequest, RegisterRequest } from "@/types";
import { authApi } from "@/services/api";

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * AuthContextType - Defines what data and functions the context provides
 */
interface AuthContextType {
  // DATA
  user: User | null;           // Current logged-in user (null if not logged in)
  isAuthenticated: boolean;    // true if user is logged in
  isLoading: boolean;          // true while checking if user is logged in

  // FUNCTIONS
  login: (data: LoginRequest) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterRequest) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ============================================
// CREATE THE CONTEXT
// ============================================

/**
 * Default value used when a component calls useAuth() outside of <AuthProvider>.
 * This prevents the entire app from crashing with a blank screen.
 */
const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => ({ success: false, error: "AuthProvider is not mounted" }),
  register: async () => ({ success: false, error: "AuthProvider is not mounted" }),
  logout: async () => {},
  refreshUser: async () => {},
};

/**
 * Create the context with a safe default.
 */
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

/**
 * AuthProvider - Wraps the app and provides auth state to all children
 * 
 * @param children - The components that will have access to auth
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ============================================
  // STATE
  // ============================================

  // Store the current user (null = not logged in)
  const [user, setUser] = useState<User | null>(null);

  // Loading state for initial auth check
  const [isLoading, setIsLoading] = useState(true);

  // Derived state: user is authenticated if user object exists
  const isAuthenticated = user !== null;

  // ============================================
  // CHECK FOR EXISTING SESSION ON PAGE LOAD
  // ============================================
useEffect(() => {
  let isMounted = true;

  async function restoreSession() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsLoading(false);
      return;
    }

    const response = await authApi.getCurrentUser();

    if (!isMounted) return;

    if (response.success && response.data) {
      setUser(response.data);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }

    setIsLoading(false);
  }

  restoreSession();

  return () => {
    isMounted = false;
  };
}, []);



  useEffect(() => {
    /**
     * When the app loads, check if user was previously logged in
     * by looking for a saved token and validating it
     */
    async function checkExistingSession() {
      // Look for saved token
      const token = localStorage.getItem("accessToken");

      if (token) {
        // Token exists, try to get user data
        const response = await authApi.getCurrentUser();

        if (response.success && response.data) {
          // Token is valid, restore the session
          setUser(response.data);
        } else {
          // Token is invalid/expired, clear storage
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      }

      // Done checking, hide loading spinner
      setIsLoading(false);
    }

    checkExistingSession();
  }, []); // Empty array = run once when component mounts

  // ============================================
  // AUTH FUNCTIONS
  // ============================================

  /**
   * Login - Authenticate user with email and password
   * 
   * useCallback is used to prevent unnecessary re-renders.
   * It "memoizes" the function so it doesn't change on every render.
   */
  const login = useCallback(async (data: LoginRequest) => {
    // Call the login API
    const response = await authApi.login(data);

    if (response.success && response.data) {
      // Success! Save tokens and user data
      const { user: userData, tokens } = response.data;

      // Save tokens to localStorage (persists across page reloads)
      localStorage.setItem("accessToken", tokens.accessToken);
      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Update state with user data
      setUser(userData);

      return { success: true };
    }

    // Login failed, return error
    return { success: false, error: response.error || "Login failed" };
  }, []);

  /**
   * Register - Create a new user account
   */
  const register = useCallback(async (data: RegisterRequest) => {
    const response = await authApi.register(data);

    if (response.success && response.data) {
      const { user: userData, tokens } = response.data;

      // Save tokens
      localStorage.setItem("accessToken", tokens.accessToken);
      if (tokens.refreshToken) {
        localStorage.setItem("refreshToken", tokens.refreshToken);
      }

      // Update state
      setUser(userData);

      return { success: true };
    }

    return { success: false, error: response.error || "Registration failed" };
  }, []);

  /**
   * Logout - End the user's session
   */
  const logout = useCallback(async () => {
    // Call logout API (optional, mainly for server-side cleanup)
    await authApi.logout();

    // Clear saved tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear user from state
    setUser(null);
  }, []);

  /**
   * RefreshUser - Fetch latest user data from server
   * Useful after profile updates
   */
  const refreshUser = useCallback(async () => {
    const response = await authApi.getCurrentUser();

    if (response.success && response.data) {
      setUser(response.data);
    }
  }, []);

  // ============================================
  // RENDER
  // ============================================

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================
// CUSTOM HOOK TO USE AUTH
// ============================================

/**
 * useAuth - Hook to access auth context in any component
 * 
 * Usage:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  // Optional: warn in dev if provider is missing
  if (context === defaultAuthContext) {
    // eslint-disable-next-line no-console
    console.warn("useAuth() is being used outside of <AuthProvider>. Returning a safe default.");
  }

  return context;
}
