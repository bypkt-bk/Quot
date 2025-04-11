import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./client";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Store token in sessionStorage (valid only for the session)
const saveToken = (token: string) =>
  sessionStorage.setItem("accessToken", token);

// Generate a session fingerprint to track the session
const generateSessionKey = (): string =>
  btoa(`${navigator.userAgent}-${Math.random()}`);

// Validate session before allowing ticket access
export const validateSession = () => {
  const storedSession = sessionStorage.getItem("sessionKey");
  if (
    !storedSession ||
    storedSession !== sessionStorage.getItem("sessionKey")
  ) {
    alert("Invalid session. Please sign in again.");
    auth.signOut();
    sessionStorage.clear();
    window.location.href = "/login"; // Redirect user
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken ?? null;
    const user = result.user;

    if (token) saveToken(token);

    if (user) {
      // Generate a unique session key and store it
      const sessionKey = generateSessionKey();
      sessionStorage.setItem("sessionKey", sessionKey);
    }

    console.log("User signed in:", user);
    console.log("Access Token:", token);

    return { user, token };
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      const firebaseError = error as { code: string; message: string };
      console.error("Error Code:", firebaseError.code);
      console.error("Error Message:", firebaseError.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};