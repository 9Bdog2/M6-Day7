import express from "express";
import createHttpError from "http-errors";
import blogPostsSchema from "./schema.js";

const blogRouter = express.Router();

blogRouter.get("/", async (req, res, next) => {
  try {
    const users = await blogPostsSchema.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

blogRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await blogPostsSchema.findById(req.params.userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new blogPostsSchema(req.body);
    const { _id } = await newUser.save();
    res.status(201).json({ _id });
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:userId", async (req, res, next) => {
  try {
    const user = await blogPostsSchema.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:userId", async (req, res, next) => {
  try {
    const user = await blogPostsSchema.findByIdAndDelete(req.params.userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
});


export default blogRouter;
