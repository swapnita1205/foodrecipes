import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import MyRecipes from "./components/MyRecipes/MyRecipes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/AddRecipes" element={<AddRecipe />} />
          <Route path="/MyRecipes" element={<MyRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
