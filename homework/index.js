import express from "express";
import q2m from "query-to-mongo";
import commentsModel from "./schema.js";

const commentsRouter = express.Router();

commentsRouter.post("/", async (req, res, next) => {
  try {
    const comment = await commentsModel.create(req.body);
    res.send(comment);
  } catch (error) {
    next(error);
  }
}).get("/", async (req, res, next) => {
    try {
        const query = q2m(req.query);
        console.log(query);
        const total = await commentsModel.countDocuments(mongoQuery.criteria);
        const comments = await commentsModel.find(mongoQuery.criteria)
        .limit(mongoQuery.options.limit)
        .skip(mongoQuery.options.skip)
        .sort(mongoQuery.options.sort);
        res.send({links : mongoQuery.links("/comments", total), pageTotal : Math.ceil(total / mongoQuery.options.limit), total, comments});
        
    } catch (error) {
        next(error);
  
    }
});

export default commentsRouter;
