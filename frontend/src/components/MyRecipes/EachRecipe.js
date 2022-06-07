import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EachRecipe = ({ recipe, userId, token, name, _id }) => {
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

  const handleDelete = (e, recipename) => {
    const userInfo = {
      userId,
      recipename,
    };
    Axios.post("http://localhost:3000/recipes/delete", userInfo).then((res) => {
      if (res.data.message === "Successfully Deleted") {
        alert(res.data.message);
        window.location.reload(false);
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
    <div className="recipeDiv">
      <Grid key={recipe._id} item>
        <img className="selectedimage"
          src={recipe.selectedFile}
        />
        <h2 className="recipename">{recipe.recipename}</h2>
        <p className="recipedetails">
          {recipe.recipedetails.slice(0, 150)}
          {recipe.recipedetails.length > 150 && (
            <span className="readmore" onClick={toggleReadMore}>
              ...read more
            </span>
          )}
        </p>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleDelete(e, recipe.recipename)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) =>
              handleUpdate(e, recipe.recipename, recipe.recipedetails, recipe.selectedFile)
            }
          >
            Update
          </Button>
        </Stack>
      </Grid>
    </div>
  );
};

export default EachRecipe;
