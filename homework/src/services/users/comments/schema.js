import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("comments", commentsSchema);
