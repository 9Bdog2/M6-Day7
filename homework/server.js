import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import cors from "cors";
import {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} from "./src/errorHandlers.js";
import blogRouter from "./src/services/users/index.js";

const server = express();
const port = process.env.PORT || 3001;
// ********************************* MIDDLEWARES ***************************************
server.use(cors());
server.use(express.json());
// ********************************* ROUTES ***************************************
server.use("/blog", blogRouter);
// ********************************* ERROR HANDLERS ***************************************

server.use(notFoundHandler);
server.use(badRequestHandler);
/* server.use(genericErrorHandler); */

mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");

  server.listen(port, () => {
    console.log(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
