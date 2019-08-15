import express = require("express");
import { meRouter } from "./users";

const apiRouter = express.Router();

apiRouter.use("/user", meRouter);

export { apiRouter };