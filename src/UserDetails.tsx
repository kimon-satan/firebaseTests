import React from "react";

export const UserDetails = ({
  formRef,
  onSubmit
}: {
  formRef: React.MutableRefObject<null>;
  onSubmit: (e: React.SyntheticEvent) => void;
}) => (
  <form
    ref={formRef}
    style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    onSubmit={onSubmit}
  >
    <label>
      Email
      <input name="email" type="email" required></input>
    </label>
    <label>
      Password
      <input name="password" type="password" required></input>
    </label>
    <button type="submit">Submit</button>
  </form>
);
