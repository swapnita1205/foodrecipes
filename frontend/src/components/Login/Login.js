import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import "./Login.css";
import cookie from "js-cookie";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import Error from "../Error/Error";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sign = (e) => {
    history("/Signup");
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users/login", user).then((res) => {
      if (res.data.user && res.data.message === "Login Successful") {
        const userId = res.data.user._id.valueOf();
        const token = res.data.user.token;
        const _id = res.data.user._id;
        const name = res.data.user.name;
        cookie.set("token", res.data.user.token);
        history("/Home", {
          state: {
            _id: _id,
            token: token,
            userId: userId,
            name: name,
          },
        });
      } else {
        alert(res.data.message);
      }
    });
  };

  if (document.cookie) {
    return <Error />;
  }
  return (
    <Grid className="loginform">
      <Paper elevation={15} className="paperStyle">
        <Grid align="center">
          <Avatar className="avatarStyle">
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form autoComplete="off" noValidate onSubmit={login}>
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter email"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className="btnStyle"
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <form
          autoComplete="off"
          noValidate
          className="signupform"
          onSubmit={sign}
        >
          <Typography variant="h6">
            <b>
              Don't have an account ?
              <Button type="submit" className="signuphere">
                Sign Up Here
              </Button>
            </b>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
