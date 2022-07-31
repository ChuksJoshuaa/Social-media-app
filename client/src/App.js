import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
// import { Google0AuthProvider } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <Router>
        <Container maxWidth="xl">
          <Navbar />
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/posts" />} />
            <Route exact path="/posts">
              <Home />
            </Route>
            <Route exact path="/posts/search">
              <Home />
            </Route>
            <Route exact path="/posts/:id" component={PostDetails} />
            <Route
              exact
              path="/auth"
              component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
            />
          </Switch>
        </Container>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
