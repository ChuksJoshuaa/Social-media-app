import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import img from "../images/memories-Logo.png";
import img1 from "../images/memories-Text.png";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../../contants/actionTypes";
import { googleLogout } from "@react-oauth/google";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const Logout = () => {
    googleLogout();
    dispatch({ type: LOGOUT });

    history.push("/");
    setUser(null);
  };

  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    const date = new Date().getTime();

    if (decodedToken.exp * 1000 < date) {
      Logout();
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src={img1} alt="icon" height="45px" />
        <img className={classes.image} src={img} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl || user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={Logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link
            to="/auth"
            style={{ textDecoration: "none" }}
            onClick={() => (window.location.href = "/auth")}
          >
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
