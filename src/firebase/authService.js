// Import the functions from the firebase modules instead of the entire library
import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Initialize a Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Define a function to sign in with Google
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// For Facebook (commented out)
// import { FacebookAuthProvider } from "firebase/auth";
// export const facebookProvider = new FacebookAuthProvider();
// ... and so on for other providers
