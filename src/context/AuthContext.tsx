import { ReactNode, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { User } from "../types/customTypes";
import { auth, provider } from "../config/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loggedUser: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
  signUp: (email: string, password: string) => void;
  logIn: (email: string, password: string) => void;
  googleLogIn: (email: string, password: string) => void;
}

//! ADD DISPLAY NAME TO AUTHCONTEXT + SIGNUP PAGE && FIND A
//! WAY TO ADDING IT TO GOOGLE (find a way to update the user information)

//! FIND A WAY OF KEEPING THE USER LOGGED IN

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthInitContext = {
  user: null,
  loggedUser: null,
  setUser: () => console.log("not initialized"),
  logOut: () => console.log("not initialized"),
  signUp: () => console.log("not initialized"),
  logIn: () => console.log("not initialized"),
  googleLogIn: () => console.log("not initialized"),
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


  const googleLogIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // setUser(result.user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
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
    <AuthContext.Provider
      value={{ user, setUser, signUp, logIn, logOut, googleLogIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
