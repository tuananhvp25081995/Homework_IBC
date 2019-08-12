import express = require("express");
import { listArray } from '../controllers/list.controller';

const listRouter = express.Router();

listRouter.get('/facebook-search/:id', listArray);

export { listRouter }