import { ReactNode, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { User } from "../types/customTypes";
import { auth, provider } from "../config/firebaseConfig";

export interface AuthContextType {
  user: User | null;
  loggedUser: User | null;
  loader: boolean;
  setUser: (user: User) => void;
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
      console.log("registration failed :>> ", error);
      alert("OH NEIN!" + errorMessage);
    }
    setLoader(false);
  };

  // const redirectTo = useNavigate();

  const logIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const loggedUser = userCredential.user;
      // console.log("user success :>> ", loggedUser);
      setUser(loggedUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error oh nein! :>> ", errorMessage);
      // alert("OH NEIN!" + errorMessage);
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

  const googleLogIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage :>> ", errorMessage);
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("credential :>> ", credential);
      });
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
        googleLogIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
