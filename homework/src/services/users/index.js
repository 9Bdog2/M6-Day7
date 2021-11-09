import express from "express";
import createHttpError from "http-errors";
import userSchema from "../../models/user/schema.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await userSchema.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await userSchema.findById(req.params.userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const user = await userSchema.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

userRouter.put("/:userId", async (req, res, next) => {
  try {
    const user = await userSchema.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }


