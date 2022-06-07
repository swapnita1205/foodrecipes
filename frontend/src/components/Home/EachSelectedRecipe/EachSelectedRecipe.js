import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./EachSelectedRecipe.css";

const EachSelectedRecipe = ({ recipe, userId, token, name, _id }) => {
  const history = useNavigate();

  const toggleReadMore = () => {
    history("/RecipeDetail", {
      state: {
        recipename: recipe.recipename,
        recipedetails: recipe.recipedetails,
        selectedFile: recipe.selectedFile,
        userId: userId,
        token: token,
        name: name,
        _id: _id,
      },
    });
  };

  return (
    <div className="recipeselectedDiv">
      <Grid key={recipe._id} item>
        <img className="recipeselectedimage"
          src={recipe.selectedFile}
          onClick={toggleReadMore}
        />
        <h2 className="recipename">{recipe.recipename}</h2>
      </Grid>
    </div>
  );
};

export default EachSelectedRecipe;
