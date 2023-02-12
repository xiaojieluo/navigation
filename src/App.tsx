import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { User } from "./modules/User";
import * as AV from "leancloud-storage";
import { Box, Container } from "@mui/material";
import Website from "./modules/Website";

function App() {
  // let currentUser: AV.User;
  // const currentUser = User.getCurrentUser();
  // console.log(currentUser);
  let currentUser: AV.User = User.getCurrentUser();

  console.log(currentUser.getEmail())
  const w = new Website();
  console.log(w.hello())
  // const u = new AV.User();
  // console.log(w.Test(), 'he');

  // console.log(u.getUsername(), 'u')

  const topBar = () => {
    if (currentUser != null) {
      return (
        <>
          <p>
            welcome {currentUser.getUsername()} | <a href="">Sign Out</a>
          </p>
        </>
      );
    } else {
      return (
        <>
          <div>
            <a href="/signup">signup</a> | <a href="/signin">signin</a>
          </div>
        </>
      );
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      {topBar()}
      <hr />
    </Container>
  );
}

export default App;
