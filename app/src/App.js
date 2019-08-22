import React, { useState } from "react";
import "./App.css";
import FormikOnboarding from "./components/Onboarding";

function App() {
  const [users, setUsers] = useState([]);
  const addUser = user => {
    setUsers([...users, user]);
  };
  return (
    console.log(users),
    (
      <div className="App">
        <FormikOnboarding addUser={addUser} />
        {users.map(user => (
          <div key={user.id}>
            {user.name} <br />
            {user.email}
          </div>
        ))}
        ,
      </div>
    )
  );
}

export default App;
