import { useEffect, useState } from "react";
import "./App.css";
import FirebaseIface from "./firebaseIface";
import { User } from "firebase/auth";
import { SignUp } from "./Signup";
import { Stories } from "./Stories";
import { SignIn } from "./Signin";

const firebaseIface = new FirebaseIface();

function App() {
  const [user, setUser] = useState<User | null>(null);

  const userChanged = (tuser: User | null) => {
    setUser(tuser);
  };

  useEffect(() => {
    firebaseIface.subscribeUser(userChanged);
  });

  return user ? (
    <>
      <button onClick={() => firebaseIface.signout()}>Sign Out</button>
      <Stories firebaseIface={firebaseIface} />
    </>
  ) : (
    <>
      <SignUp firebaseIface={firebaseIface} />
      <SignIn firebaseIface={firebaseIface} />
    </>
  );
}

export default App;
