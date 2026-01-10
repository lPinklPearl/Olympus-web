import app from "@/lib/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const auth = getAuth(app);

// Login
export const login = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
  return signOut(auth);
};

// Watch auth state
export const watchAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
