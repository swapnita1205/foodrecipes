import React, { useState, useEffect } from "react";
import "./MyRecipes.css";
import { useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { Grid } from "@material-ui/core";
import cookie from "js-cookie";
import EachRecipe from "./EachRecipe";
import Alert from "../Home/Alert";
import { v4 as uuid } from "uuid";
import Error from "../Error/Error";
import Header from "../Header/Header";

const MyRecipes = () => {
  const history = useNavigate();
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");

  const location = useLocation();
  const userId = location.state ? location.state.userId : "";
  const _id = location.state ? location.state._id : 0;
  const token = location.state ? location.state.token : "";
  const name = location.state ? location.state.name : "";
  const [recipes, setRecipes] = useState([]);
  const [flag, isflag] = useState(0);

  useEffect(() => {
    if (document.cookie.substring(6) !== token) {
      logout();
    }
    if (!flag) {
      Axios.post("http://localhost:3000/recipes/myrecipes", {
        userId: userId,
      }).then((res) => {
        setRecipes(res.data);
      });
    }
  }, []);

  const onChange = (e) => setQuery(e.target.value);

  const logout = (e) => {
    Axios.post("http://localhost:3000/users/logout").then(() => {
      cookie.remove("token");
      history("/", {
        state: { _id: _id, token: token, userId: userId, name: name },
      });
    });
  };

  const getData = async () => {
    if (query !== "") {
      isflag(1);
      Axios.post("http://localhost:3000/recipes/searchrecipes", {
        query: query,
        userId: userId,
      }).then((res) => {
        setRecipes(res.data);
      });
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const showall = (e) => {
    isflag(0);
    window.location.reload(false);
  };

  if (!document.cookie) {
    return <Error />;
  }
  return (
    <div>
      <Header _id={_id} userId={userId} token={token} name={name} />
      <h1 className="title">My Recipes</h1>
      <form onSubmit={onSubmit} className="search-my-recipe">
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Type something..."
        />
        <input type="submit" value="Search" />
      </form>
      <button onClick={showall} className="showall">
        Show All
      </button>
      <Grid container alignItems="stretch" spacing={5}>
        {recipes.reverse().map((recipe) => (
          <EachRecipe
            key={uuid()}
            recipe={recipe}
            userId={userId}
            token={token}
            name={name}
            _id={_id}
          ></EachRecipe>
        ))}
      </Grid>
    </div>
  );
};

export default MyRecipes;
