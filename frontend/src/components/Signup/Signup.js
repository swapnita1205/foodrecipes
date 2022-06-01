import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const Signup = () => {
  const history = useNavigate();

  useEffect(() => {
    if (document.cookie) {
      history("/Home");
    }
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      axios.post("http://localhost:3000/users/register", user).then((res) => {
        alert(res.data.message);
        if (res.data.message === "User already registered") {
          history("/Signup");
          setUser({ name: "", email: "", password: "", reEnterPassword: "" });
        } else if (res.data.message === "Successfully Registered, Please login now.") {
          history("/");
        }
      });
    } else {
      console.log("invalid input");
    }
  };

  const login = (e) => {
    history("/");
  };

  return (
    <Grid>
      <Paper elevation={20} className="paperStyle">
        <Grid align="center">
          <Avatar className="avatarStyle">
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="headerStyle">Sign Up</h2>
          <Typography variant="caption" className="desc" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <form autoComplete="off" noValidate onSubmit={register}>
          <TextField
            fullWidth
            name="name"
            value={user.name}
            label="Name"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="email"
            value={user.email}
            label="Email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="password"
            value={user.password}
            label="Password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="reEnterPassword"
            value={user.reEnterPassword}
            label="Confirm Password"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="btnsignup"
            fullWidth
          >
            Sign up
          </Button>
        </form>
        <form autoComplete="off" noValidate onSubmit={login}>
          <Typography>
            {" "}
            <b> ALREADY HAVE AN ACCOUNT ? </b>
          </Typography>
          <Button type="submit" color="primary" variant="contained" fullWidth>
            Sign In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
