import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import "./AddRecipe.css";
import cookie from "js-cookie";
import Error from "../Error/Error";
import Header from "../Header/Header";

const AddRecipe = () => {
  const history = useNavigate();
  const location = useLocation();
  const recipename = location.state ? location.state.recipename : "";
  const recipedetails = location.state ? location.state.recipedetails : "";
  const userId = location.state ? location.state.userId : "";
  const _id = location.state ? location.state._id : 0;
  const token = location.state ? location.state.token : "";
  const flag = location.state ? location.state.flag : 0;
  const name = location.state ? location.state.name : "";

  const [postData, setPostData] = useState({
    RecipeName: "",
    Recipe: "",
  });

  useEffect(() => {
    if (document.cookie.substring(6) !== token) {
      logout();
    }
    if (flag) setPostData({ RecipeName: recipename, Recipe: recipedetails });
  }, []);

  const clear = () => {
    setPostData({ RecipeName: "", Recipe: "" });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const userRecipe = {
      userId,
      postData,
    };
    Axios.post("http://localhost:3000/recipes/updaterecipes", userRecipe).then(
      (res) => {
        if (res.data.message === "Recipe Updated") {
          history("/MyRecipes", {
            state: { _id: _id, token: token, userId: userId, name: name },
          });
        } else {
          alert(res.data.message);
        }
      }
    );
    clear();
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const userRecipe = {
      userId,
      postData,
    };
    if (postData.RecipeName && postData.Recipe) {
      Axios.post("http://localhost:3000/recipes/addrecipes", userRecipe).then(
        (res) => {
          if (res.data.message === "Recipe added.") {
            history("/MyRecipes", {
              state: { _id: _id, token: token, userId: userId, name: name },
            });
          } else {
            alert(res.data.message);
          }
        }
      );
    } else {
      alert("Please fill the specified fields");
    }
    clear();
  };

  const logout = (e) => {
    Axios.post("http://localhost:3000/users/logout").then(() => {
      cookie.remove("token");
      history("/", {
        state: { _id: _id, token: token, userId: userId, name: name },
      });
    });
  };

  if (!document.cookie) {
    return <Error />;
  }
  return (
    <div>
      <Header _id={_id} userId={userId} token={token} name={name} />
      <Paper className="paper" elevation={6}>
        <form autoComplete="off" noValidate>
          <Typography variant="h3">
            {flag ? "Edit Your Recipe" : "Add Your Recipe"}
          </Typography>
          <TextField
            name="RecipeName"
            variant="outlined"
            label="Recipe Name"
            className="field1"
            fullWidth
            required
            value={postData.RecipeName}
            onChange={(e) =>
              setPostData({ ...postData, RecipeName: e.target.value })
            }
          />
          <TextField
            name="Recipe"
            variant="outlined"
            label="Recipe"
            className="field2"
            fullWidth
            multiline
            required
            rows={4}
            value={postData.Recipe}
            onChange={(e) =>
              setPostData({ ...postData, Recipe: e.target.value })
            }
          />
          <Button
            className="buttonsubmit"
            variant="contained"
            color="primary"
            size="large"
            onClick={flag ? handleUpdateSubmit : handleAddSubmit}
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            className="buttonsubmit"
            variant="contained"
            color="tertiary"
            size="large"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddRecipe;
