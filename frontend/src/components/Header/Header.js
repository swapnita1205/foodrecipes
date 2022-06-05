import React from "react";
import "./Header.css";
import Axios from "axios";
import { useNavigate } from "react-router";
import cookie from "js-cookie";

const Header = ({ _id, token, userId, name }) => {
  const history = useNavigate();

  const logout = (e) => {
    const userInfo = {
      _id,
    };
    Axios.post("http://localhost:3000/users/logout", userInfo).then(() => {
      cookie.remove("token");
      history("/", {
        state: { _id: _id, token: token, userId: userId, name: name },
      });
    });
  };

  const myrecipes = (e) => {
    history("/MyRecipes", {
      state: { _id: _id, token: token, userId: userId, name: name },
    });
  };

  const addrecipes = (e) => {
    history("/AddRecipes", {
      state: { _id: _id, token: token, userId: userId, name: name },
    });
  };

  const home = (e) => {
    history("/Home", {
      state: { _id: _id, token: token, userId: userId, name: name },
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
                alert("Your account is deactivated now!");
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

  return (
    <header>
      <nav className="main-nav">
        <h1 className="username">Hey, {name}!</h1>
        <ul className="navlinks">
          <li>
            <a onClick={addrecipes}>Add a Recipe</a>
          </li>
          <li>
            <a onClick={myrecipes}>My Recipes</a>
          </li>
          <li>
            <a onClick={home}>Home</a>
          </li>
          <li>
            <a onClick={logout}>Logout</a>
          </li>
          <li>
            <a onClick={deactivate} className="deactivated">
              Deactivate
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
