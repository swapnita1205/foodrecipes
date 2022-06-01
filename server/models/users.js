import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.token = token;
    await this.save(); //saving token
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = new mongoose.model("User", userSchema);

export default User;
