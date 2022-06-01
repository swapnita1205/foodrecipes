import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const EachRecipe = ({ recipe, userId, token }) => {
  const history = useNavigate();

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
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
        history("/MyRecipes", { state: { userId: userId, token:token } });
      } else {
        console.log(res.data.message);
      }
    });
  };

  const handleUpdate = (e, recipename, recipedetails) => {
    history("/AddRecipes", { state: { userId: userId, token:token, recipename: recipename, recipedetails: recipedetails, flag: 1 } });
  };

  return (
    <div className="recipeDiv">
      <Grid key={recipe._id} item>
        <h2 className="recipename">{recipe.recipename}</h2>
        <p className="recipedetails">
          {isReadMore
            ? recipe.recipedetails.slice(0, 150)
            : recipe.recipedetails}
          {recipe.recipedetails.length > 150 && (
            <span className="readmore" onClick={toggleReadMore}>
              {isReadMore ? "...read more" : " ...show less"}
            </span>
          )}
        </p>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary" onClick={(e) => handleDelete(e, recipe.recipename)}>Delete</Button>
          <Button variant="contained" color="primary" onClick={(e) => handleUpdate(e, recipe.recipename, recipe.recipedetails)}>Update</Button>
        </Stack>
      </Grid>
    </div>
  );
};

export default EachRecipe;
