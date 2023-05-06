import React, { useRef } from "react";
import FirebaseIface from "./firebaseIface";

export const SignUp = ({ firebaseIface }: { firebaseIface: FirebaseIface }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (e) => {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    firebaseIface.signup(formProps.username, formProps.password);
    e.preventDefault();
  };

  return (
    <>
      <h1>Sign Up</h1>
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
