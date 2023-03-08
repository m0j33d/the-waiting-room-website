const express = require('express');
const router = express.Router();
const userRoute = require("./user.route")
const articleRoute = require('./article.route')


router.use('/user', userRoute);
router.use('/article', articleRoute);


module.exports = router;
