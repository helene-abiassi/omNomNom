import { ReactNode, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "../types/customTypes";
import { auth } from "../config/firebaseConfig";

export interface AuthContextType {
  user: User | null;
  loggedUser: User | null;
  loader: boolean;
  setUser: (user: User | null) => void;
  logOut: () => void;
  signUp: (displayName: string, email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  deleteMyUser: () => void;
  googleLogIn: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthInitContext = {
  user: null,
  loggedUser: null,
  loader: true,
  setUser: () => console.log("not initialized"),
  logOut: () => console.log("not initialized"),
  signUp: () => console.log("not initialized"),
  logIn: () => console.log("not initialized"),
  deleteMyUser: () => console.log("not initialized"),
  googleLogIn: () => console.log("not initialized"),
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(true);

  const signUp = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoader(true);
      const registeredUser = userCredential.user;
      console.log("user success :>> ", registeredUser);
      await updateProfile(registeredUser, { displayName: displayName });
    } catch (error) {
      const errorCode = "";
      const errorMessage = "";
      console.log("registration failed :>> ", errorCode);
      alert("OH NEIN!" + errorMessage);
    }
    setLoader(false);
  };

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredential.user;
      setUser(loggedUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const deleteMyUser = () => {
    if (window.confirm("Are you SURE you want to delete your account?")) {
      deleteUser(user)
        .then(() => {
          console.log("User deleted");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const isUserActive = () => {
    onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
        const uid = loggedUser.uid;
        console.log("uid :>> ", uid);
        setUser(loggedUser);
        setLoader(false);
      } else {
        setUser(null);
        setLoader(false);
      }
    });
  };

  useEffect(() => {
    isUserActive();
  }, []);

  const logOut = () => {
    if (window.confirm("Are you SURE you want to log out?")) {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        logIn,
        logOut,
        loader,
        deleteMyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
