import express from "express";
import Recipe from "../models/recipes.js";
const recipesrouter = express.Router();

recipesrouter.post("/delete", (req, res) => {
  const { userId, recipename } = req.body;
  Recipe.findOne(
    { userId: userId, recipename: recipename },
    async (_err, user) => {
      if (user) {
        await Recipe.deleteOne({ userId: userId, recipename: recipename });
        res.send({ message: "Successfully Deleted" });
      } else {
        res.send({ message: "There was some error!" });
      }
    }
  );
});

recipesrouter.post("/deactivate", (req, res) => {
  const { userId } = req.body;
  Recipe.find({ userId: userId }, async (_err, user) => {
    if (user) {
      await Recipe.deleteMany({ userId: userId });
      res.send({ message: "Successfully Deleted" });
    } else {
      res.send({ message: "There was some error!" });
    }
  });
});

recipesrouter.post("/myrecipes", async (req, res) => {
  const { userId } = req.body;
  try {
    const Recipes = await Recipe.find({ userId: userId });
    res.status(200).json(Recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

recipesrouter.post("/searchrecipes", async (req, res) => {
  const { query, userId } = req.body;
  const substr = ".*"+query+".*";
  try {
    const Recipes = await Recipe.find({ recipename: { $regex: substr, '$options' : 'i' }, userId: userId });
    res.status(200).json(Recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

recipesrouter.post("/updaterecipes", (req, res) => {
  const { userId, postData } = req.body;
  Recipe.findOne(
    { userId: userId, recipename: postData.RecipeName },
    async (_err, user) => {
      if (user) {
        await Recipe.updateOne(
          {
            userId: userId,
            recipename: postData.RecipeName,
          },
          { $set: { recipedetails: postData.Recipe, selectedFile: postData.selectedFile } }
        );
        res.send({ message: "Recipe Updated", recipe: postData });
      } else {
        res.send({ message: "Invalid info!" });
      }
    }
  );
});

recipesrouter.post("/addrecipes", (req, res) => {
  const { userId, postData } = req.body;
  const recipename = postData.RecipeName;
  const recipedetails = postData.Recipe;
  const selectedFile = postData.selectedFile;
  Recipe.findOne(
    { recipename: recipename, userId: userId },
    async (_err, recipe) => {
      if (recipe) {
        res.send({ message: "Recipe already exists...Try updating it!!" });
      } else {
        const recipe = new Recipe({
          userId,
          recipename,
          recipedetails,
          selectedFile,
        });
        recipe.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "Recipe added." });
          }
        });
      }
    }
  );
});

export default recipesrouter;
