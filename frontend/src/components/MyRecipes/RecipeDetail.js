import React from "react";
import { useNavigate, useLocation } from "react-router";
import Header from "../Header/Header";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Axios from "axios";

const RecipeDetail = () => {
  const history = useNavigate();
  const location = useLocation();
  const userId = location.state ? location.state.userId : "";
  const _id = location.state ? location.state._id : 0;
  const token = location.state ? location.state.token : "";
  const selectedFile = location.state ? location.state.selectedFile : "";
  const name = location.state ? location.state.name : "";
  const recipename = location.state ? location.state.recipename : "";
  const recipedetails = location.state ? location.state.recipedetails : "";

  const handleDelete = (e, recipename) => {
    const userInfo = {
      userId,
      recipename,
    };
    Axios.post("http://localhost:3000/recipes/delete", userInfo).then((res) => {
      if (res.data.message === "Successfully Deleted") {
        alert(res.data.message);
        history("/MyRecipes", {
          state: { userId: userId, token: token, name: name },
        });
      } else {
        console.log(res.data.message);
      }
    });
  };
  const handleUpdate = (e, recipename, recipedetails, selectedFile) => {
    history("/AddRecipes", {
      state: {
        userId: userId,
        token: token,
        name: name,
        recipename: recipename,
        recipedetails: recipedetails,
        selectedFile: selectedFile,
        flag: 1,
      },
    });
  };
  return (
    <div>
      <Header _id={_id} userId={userId} token={token} name={name} />
      <h1 className="recipedetname">{recipename}</h1>
      <img className="recipedetselectedimage" src={selectedFile} />
      <h2 className="recipedetdetails">{recipedetails}</h2>
      <Stack spacing={2} direction="row" className="recipedetstack">
        <Button
          variant="contained"
          color="secondary"
          className="recipedetdelete"
          onClick={(e) => handleDelete(e, recipename)}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleUpdate(e, recipename, recipedetails)}
        >
          Update
        </Button>
      </Stack>
    </div>
  );
};

export default RecipeDetail;
