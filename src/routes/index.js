import express from "express";

import {router as userRoute}  from "./user.route.js"
import {router as articleRoute} from "./article.route.js"
import { router as commentRoute} from "./comment.route.js"

const router = express.Router();

router.use('/user', userRoute);
router.use('/article', articleRoute);
router.use('/comment', commentRoute);


export {router} ;
