import React, { useRef } from "react";
import FirebaseIface from "./firebaseIface";

export const SignIn = ({ firebaseIface }: { firebaseIface: FirebaseIface }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    firebaseIface.signin(formProps.username, formProps.password);
  };

  return (
    <>
      <h1>Sign In</h1>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        onSubmit={onSubmit}
      >
        <label>
          Email
          <input
            name="username"
            ref={usernameRef}
            type="email"
            required
          ></input>
        </label>
        <label>
          Password
          <input
            name="password"
            ref={passwordRef}
            type="password"
            required
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
