import React from "react";

const Recipe = ({ recipe }) => {
  const { label, image, url } = recipe.recipe;
  return (
    <div className="recipe">
      <img src={image} alt={label} />
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </div>
  );
};

export default Recipe;
