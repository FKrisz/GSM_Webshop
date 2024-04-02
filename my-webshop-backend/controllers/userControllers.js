import User from "../src/models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, prename, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        prename,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          prename: user.prename,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
      }
      else {
        res.status(400);
        throw new Error("User not found");
      }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        prename: user.prename,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

export { registerUser, authUser };