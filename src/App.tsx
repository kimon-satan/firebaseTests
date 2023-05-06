import { useEffect, useState } from "react";
import "./App.css";
import FirebaseIface from "./firebaseIface";

const firebaseIface = new FirebaseIface();

function App() {
  const [users, setUsers] = useState<Record<string, any>[]>([]);

  const usersChanged = (newUsers: Record<string, any>[]) => {
    setUsers(newUsers);
  };

  useEffect(() => {
    if (users.length === 0) {
      firebaseIface.subscribeUsers(usersChanged);
    }
  });

  const renderedUsers = users.map((u) => (
    <div className="user-details" key={u.id}>
      <div>id: {u.id}, </div>
      <div>first: {u.first}, </div>
      <div>last: {u.last}, </div>
      <div>born: {u.born}</div>
    </div>
  ));

  return (
    <>
      <h1>Firebase testing app</h1>
      <div className="menu">
        <button onClick={() => firebaseIface.addUser()}>Add user</button>
        {/* <button onClick={() => firebaseIface.getUsers()}>Get users</button> */}
      </div>

      <div className="users">{renderedUsers}</div>
    </>
  );
}

export default App;
