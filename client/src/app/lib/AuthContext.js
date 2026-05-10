"use client";
import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth, googleProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { API_ENDPOINTS } from "@/lib/api";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Try to get role from localStorage first (persists across reloads)
  const [userRole, setUserRole] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userRole") || "user";
    }
    return "user";
  });
  const [loading, setLoading] = useState(!auth);
  // Start as true so we wait for initial role sync
  const [roleLoading, setRoleLoading] = useState(true);

  // Helper to set role with localStorage backup
  const setRoleWithStorage = (role) => {
    console.log("Setting role:", role);
    setUserRole(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role);
    }
  };

  const syncUserWithBackend = async (firebaseUser) => {
    setRoleLoading(true);
    try {
      console.log("Syncing user with backend:", firebaseUser.email);
      const response = await fetch(API_ENDPOINTS.auth.syncFirebase, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        }),
      });

      const data = await response.json();
      console.log("Backend sync response:", data);
      if (data.success && data.user) {
        console.log("Setting userRole to:", data.user.role);
        setRoleWithStorage(data.user.role || "user");
        return data.user.role || "user";
      } else {
        console.warn(
          "Backend sync returned no role or success=false, using existing:",
          userRole,
        );
        throw new Error(
          data.message || "Failed to sync user with backend server",
        );
      }
    } catch (error) {
      console.error("Failed to sync user with backend:", error);
      throw new Error(
        "Unable to connect to backend server. Please make sure the server is running.",
      );
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      console.warn(
        "Firebase auth is not initialized. Authentication features will be disabled.",
      );
      setLoading(false);
      setRoleLoading(false);
      return;
    }

    console.log("AuthContext: Setting up onAuthStateChanged listener");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthContext: onAuthStateChanged fired, user:", user?.email);
      setUser(user);

      if (user) {
        try {
          // syncUserWithBackend handles roleLoading state
          await syncUserWithBackend(user);
        } catch (err) {
          console.error(
            "AuthContext: Failed to sync user on auth state change",
            err,
          );
          // Fallback to user role if sync fails on load
          setRoleWithStorage("user");
        }
      } else {
        console.log(
          "AuthContext: No Firebase user, keeping existing role from storage",
        );
        // Don't clear the role - it might be set from backend token auth (admin registration)
        // Role will be validated when user actually tries to access protected resources
        setRoleLoading(false); // No Firebase user, but role might still be valid from backend
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Immediately sync to get the role
    const role = await syncUserWithBackend(userCredential.user);
    return { ...userCredential, role };
  };
  const register = (email, password) => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      console.error("Firebase auth is not initialized", {
        auth,
        googleProvider,
      });
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    console.log("Attempting Google sign-in...");
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      // Immediately sync to get the role
      const role = await syncUserWithBackend(userCredential.user);
      return { ...userCredential, role };
    } catch (error) {
      console.error("Google sign-in error:", error.code, error.message);
      throw error;
    }
  };
  const logout = () => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        roleLoading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
