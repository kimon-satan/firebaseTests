import React, { useRef } from "react";
import FirebaseIface from "./firebaseIface";
import { UserDetails } from "./UserDetails";

export const SignUp = ({ firebaseIface }: { firebaseIface: FirebaseIface }) => {
  const formRef = useRef(null);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e.target);
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    firebaseIface.signup(email, password);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <UserDetails formRef={formRef} onSubmit={onSubmit} />
    </>
  );
};
