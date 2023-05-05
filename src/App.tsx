import React from "react";
import "./App.css";
import FirebaseIface from "./firebaseIface";

const firebaseIface = new FirebaseIface();

function App() {
  return (
    <>
      <h1>Firebase testing app</h1>
      <button onClick={() => firebaseIface.addUser()}>Add user</button>
    </>
  );
}

export default App;
