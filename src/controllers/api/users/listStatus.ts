import express = require("express");
import { listArray } from '../../../lib';

const listRouter = express.Router();

listRouter.get('/facebook-search/:id', listArray);

export { listRouter };
