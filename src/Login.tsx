import { useState } from "react";
import FirebaseIface from "./firebaseIface";
import { SignUp } from "./Signup";
import { SignIn } from "./Signin";

type loginStates = "menu" | "signin" | "signup";

const LoginMenu = ({ onClick }: { onClick: (e: loginStates) => void }) => {
  return (
    <>
      <button onClick={() => onClick("signin")}>Sign In</button>
      <button onClick={() => onClick("signup")}>Sign Up</button>
    </>
  );
};

export const Login = ({ firebaseIface }: { firebaseIface: FirebaseIface }) => {
  const [loginState, setLoginState] = useState<loginStates>("menu");

  const onClick = (e: loginStates) => {
    setLoginState(e);
  };

  switch (loginState) {
    case "menu":
      return <LoginMenu onClick={onClick} />;
    case "signin":
      return <SignIn firebaseIface={firebaseIface} />;

    case "signup":
      return <SignUp firebaseIface={firebaseIface} />;
  }
};
