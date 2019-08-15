import express = require("express");
import { listRouter } from './listStatus';
import { loginRouter } from './loginFb';

const meRouter = express.Router();

meRouter.use("/status", listRouter);
meRouter.use("/login", loginRouter);

export { meRouter };