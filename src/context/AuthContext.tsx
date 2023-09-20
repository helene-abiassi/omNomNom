import { ReactNode, createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "../types/customTypes";
import { auth } from "../config/firebaseConfig";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  signUp: (email: string, password: string) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthInitContext = {
  user: null,
  setUser: () => console.log("not initialized"),
  logout: () => console.log("not initialized"),
  signUp: () => console.log("not initialized"),
};

const signUp = (email: string, password: string) => {
  // console.log("object :>> ", email, password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("yey :>> ", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("nein :>> ", errorMessage);
    });
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
