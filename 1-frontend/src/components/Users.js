import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import { Button, TextField, makeStyles, Link } from "@material-ui/core/";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    AxiosWithAuth()
      .get("/users")
      .then(res => {
        console.log("get res", res);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("get err", err);
      });
  }, []);

  const handleLogout = () => {
    history.push("/");
    localStorage.clear("token");
  };

  return (
    <div>
      <h1>THIS IS THE SECRET USERS PAGE</h1>
      <h2>Find a list of all the people in your department here.</h2>
      <div>
        {users.map(user => (
          <div key={user.id}>
            <p>{user.username}</p>
          </div>
        ))}
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
