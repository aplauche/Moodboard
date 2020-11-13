import React, { useEffect, useContext } from "react";

import Login from "./components/Login";
import Header from "./components/Header";
import HomeLoggedOut from "./pages/HomeLoggedOut";
import Layout from "./pages/Layout";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Context } from "./store";
import { auth } from "./firebase";

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
  }, [appState.user]);

  return (
    <BrowserRouter>
      <Switch>
        {appState.user ? (
          <Route path="/" exact>
            <Layout>
              <HomeLoggedIn />
            </Layout>
          </Route>
        ) : (
          <Route path="/" exact>
            <HomeLoggedOut />
          </Route>
        )}
        <Layout></Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
