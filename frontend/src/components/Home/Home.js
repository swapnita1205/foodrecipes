import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Recipe from "./Recipe";
import Axios from "axios";
import Error from "../Error/Error";
import "./Home.css";
import { useNavigate } from "react-router";
import cookie from "js-cookie";
import { useLocation } from "react-router-dom";

const Home = () => {
  const history = useNavigate();

  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [display, setDisplay] = useState("");

  const location = useLocation();
  const userId = location.state ? location.state.userId : "";
  const _id = location.state ? location.state._id : 0;
  const token = location.state ? location.state.token : "";

  useEffect(() => {
    if (document.cookie.substring(6) !== token) {
      logout();
    }
  }, []);

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setDisplay("Oops!No recipe found");
      }
      setRecipes(result.data.hits);
      setQuery("");
      setDisplay("");
    } else {
      setDisplay("Please fill the form");
    }
  };

  const logout = (e) => {
    const userInfo = {
      _id,
    };
    Axios.post("http://localhost:3000/users/logout", userInfo).then(() => {
      cookie.remove("token");
      history("/", { state: { _id: _id, token: token, userId: userId } });
    });
  };

  const myrecipes = (e) => {
    history("/MyRecipes", {
      state: { _id: _id, token: token, userId: userId },
    });
  };

  const addrecipes = (e) => {
    history("/AddRecipes", {
      state: { _id: _id, token: token, userId: userId },
    });
  };

  const deactivate = (e) => {
    const userInfo = {
      _id,
      userId,
    };
    Axios.post("http://localhost:3000/recipes/deactivate", userInfo).then(
      (res) => {
        if (res.data.message === "Successfully Deleted") {
          Axios.post("http://localhost:3000/users/deactivate", userInfo).then(
            (res) => {
              if (res.data.message === "Successfully Deleted") {
                alert(res.data.message);
                logout();
              } else {
                console.log(res.data.message);
              }
            }
          );
        } else {
          console.log(res.data.message);
        }
      }
    );
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  if (!document.cookie) {
    return <Error />;
  }
  return (
    <div>
      <button className="logout" onClick={myrecipes}>
        My Recipes
      </button>
      <button className="logout" onClick={addrecipes}>
        Add a Recipe
      </button>
      <button className="logout" onClick={logout}>
        Logout
      </button>
      <h1>Food Recipe Page</h1>
      <form onSubmit={onSubmit} className="search-form">
        {display !== "" && <Alert alert={display} />}
        <input
          type="text"
          name="query"
          onChange={onChange}
          value={query}
          autoComplete="off"
          placeholder="Example: Chicken Tikka, Paneer Bhurji, ..."
        />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map((recipe) => <Recipe recipe={recipe} />)}
      </div>
      <button className="delete" onClick={deactivate}>
        Delete Account
      </button>
    </div>
  );
};

export default Home;
