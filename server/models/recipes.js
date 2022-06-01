import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    userId: String,
    recipename: String,
    recipedetails: String,
  },
  {
    timestamps: true,
  }
);

const Recipe = new mongoose.model("Recipe", recipeSchema);

export default Recipe;
