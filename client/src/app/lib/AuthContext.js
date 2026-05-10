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
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(!auth);

  const syncUserWithBackend = async (firebaseUser) => {
    try {
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
      if (data.success && data.user) {
        setUserRole(data.user.role || "user");
      }
    } catch (error) {
      console.error("Failed to sync user with backend:", error);
      // Don't throw error - allow login to proceed even if sync fails
    }
  };

  useEffect(() => {
    if (!auth) {
      console.warn(
        "Firebase auth is not initialized. Authentication features will be disabled.",
      );
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        await syncUserWithBackend(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    return signInWithEmailAndPassword(auth, email, password);
  };
  const register = (email, password) => {
    if (!auth) {
      console.error("Firebase auth is not initialized");
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    if (!auth || !googleProvider) {
      console.error("Firebase auth is not initialized", {
        auth,
        googleProvider,
      });
      return Promise.reject(new Error("Firebase auth is not initialized"));
    }
    console.log("Attempting Google sign-in...");
    return signInWithPopup(auth, googleProvider).catch((error) => {
      console.error("Google sign-in error:", error.code, error.message);
      throw error;
    });
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
