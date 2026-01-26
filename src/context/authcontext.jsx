import React, { createContext, useContext, useEffect, useState } from "react";
import {auth, googleProvider} from "../firebase"
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import toastr from "toastr";

toastr.options = {
   "closeButton": true,
   "positionClass": "toast-bottom-right",
   "timeOut": "5000"
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toastr.success("Signed in successfully!");
    } catch (error) {
      console.error(error);
      toastr.error("Failed to sign in.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toastr.info("You have logged out.");
    } catch (error) {
      toastr.error("Error logging out.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};