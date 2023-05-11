import { useEffect, useState } from "react";
import FirebaseIface from "./firebaseIface";
import { User } from "firebase/auth";
import { Stories } from "./Stories";
import { Login } from "./Login";
import "./App.css";

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
    <Login firebaseIface={firebaseIface} />
  );
}

export default App;
