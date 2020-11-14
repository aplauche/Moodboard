import React, { useEffect, useContext, useState } from "react";

import HomeLoggedOut from "./pages/HomeLoggedOut";
import Layout from "./pages/Layout";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Context } from "./store";
import { auth } from "./firebase";
import MyBoards from "./pages/MyBoards";
import Explore from "./pages/Explore";
import SingleBoard from "./pages/SingleBoard";

function App() {
  const { appState, appDispatch } = useContext(Context);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        appDispatch({ type: "setUser", user: authUser });
      } else {
        appDispatch({ type: "logout" });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (appState.loadingUser) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        {!appState.user ? (
          <Route path="/">
            <HomeLoggedOut />
          </Route>
        ) : (
          <Route path="/" exact>
            <Layout>
              <HomeLoggedIn />
            </Layout>
          </Route>
        )}
        <Layout>
          <Route exact path="/boards">
            <MyBoards />
          </Route>
          <Route path="/boards/:id">
            <SingleBoard />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
