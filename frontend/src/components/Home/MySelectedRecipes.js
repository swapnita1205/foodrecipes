import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import EachSelectedRecipe from "./EachSelectedRecipe/EachSelectedRecipe";
import { Grid } from "@material-ui/core";
import { v4 as uuid } from "uuid";

const MySelectedRecipes = ({ userId, _id, name, token }) => {
  const history = useNavigate();
  const [selectedrecipes, setselectedRecipes] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3000/recipes/myrecipes", {
      userId: userId,
    }).then((res) => {
      setselectedRecipes(res.data);
    });
  }, []);

  const myrecipes = (e) => {
    history("/MyRecipes", {
      state: { _id: _id, token: token, userId: userId, name: name },
    });
  };

  return (
    <div>
      <h1 className="myselectedrecipes">My Recipes</h1>
      <b onClick={myrecipes} className="viewmore">
        View more...
      </b>
      <Grid container alignItems="stretch" spacing={5}>
        {selectedrecipes
          .slice(0, 4)
          .map((recipe) => (
            <EachSelectedRecipe
              key={uuid()}
              recipe={recipe}
              userId={userId}
              token={token}
              name={name}
              _id={_id}
            ></EachSelectedRecipe>
          ))}
      </Grid>
    </div>
  );
};

export default MySelectedRecipes;
