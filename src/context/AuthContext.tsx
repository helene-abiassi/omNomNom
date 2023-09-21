import { ReactNode, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { User } from "../types/customTypes";
import { auth } from "../config/firebaseConfig";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
}


interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthInitContext = {
  user: null,
  setUser: () => console.log("not initialized"),
  logOut: () => console.log("not initialized"),
  signUp: () => console.log("not initialized"),
  logIn: () => console.log("not initialized"),
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (email: string, password: string) => {
    // console.log("object :>> ", email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const registeredUser = userCredential.user;
      console.log("user success :>> ", registeredUser);
      alert("YEY!");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error oh nein! :>> ", errorMessage);
      alert("OH NEIN!" + errorMessage);
    }
  };

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredential.user;
      // console.log("user success :>> ", loggedUser);
      alert("WILKOMMEN WIEDER!");
      setUser(loggedUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error oh nein! :>> ", errorMessage);
      alert("OH NEIN!" + errorMessage);
    }
  };

  const isUserActive = () => {
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        const uid = loggedUser.uid;
        console.log("uid :>> ", uid);
        setUser(loggedUser);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    isUserActive();
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
